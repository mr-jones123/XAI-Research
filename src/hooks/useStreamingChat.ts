import { useState, useCallback } from "react"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface LimeExplanation {
  original_output: string
  explanation: Array<[string | number, number]>
  intercept?: number
}

export interface LimeHistoryItem {
  id: string
  timestamp: number
  userMessage: string
  assistantMessage: string
  explanation: LimeExplanation
}


export function useStreamingChat() {
  const endpoint = process.env.NEXT_PUBLIC_RENDER_ENDPOINT || "http://localhost:8000"

  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLimeProcessing, setIsLimeProcessing] = useState(false)
  const [limeHistory, setLimeHistory] = useState<LimeHistoryItem[]>([])
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)
      setIsLimeProcessing(false)
      setError(null)

      // Create assistant message placeholder
      const assistantMessageId = `assistant-${Date.now()}`
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Store user message content and assistant response for LIME history
      const userMessageContent = content.trim()
      let assistantMessageContent = ""

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          throw new Error("Response body is not readable")
        }

        let buffer = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split("\n")
          buffer = lines.pop() || ""

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)

              try {
                const parsed = JSON.parse(data)

                if (parsed.type === "start") {
                  // Stream started
                  console.log("Stream started")
                } else if (parsed.type === "content") {
                  // Append text chunk to assistant message
                  assistantMessageContent += parsed.text
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantMessageId
                        ? { ...msg, content: msg.content + parsed.text }
                        : msg
                    )
                  )
                } else if (parsed.type === "done") {
                  // Stream complete
                  console.log("Stream complete")
                } else if (parsed.type === "lime-start") {
                  // LIME processing started
                  console.log("LIME processing started")
                  setIsLimeProcessing(true)
                } else if (parsed.type === "lime-complete") {
                  // LIME explanation received
                  console.log("LIME explanation received:", parsed.data)

                  // Add to LIME history
                  const historyItem: LimeHistoryItem = {
                    id: `lime-${Date.now()}`,
                    timestamp: Date.now(),
                    userMessage: userMessageContent,
                    assistantMessage: assistantMessageContent,
                    explanation: parsed.data
                  }

                  setLimeHistory((prev) => [...prev, historyItem])
                  setIsLimeProcessing(false)
                } else if (parsed.type === "error") {
                  // Handle error
                  setError(parsed.error)
                  console.error("Stream error:", parsed.error)
                }
              } catch (e) {
                console.error("Failed to parse SSE data:", data, e)
              }
            }
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        setError(errorMessage)
        console.error("Streaming error:", err)

        // Remove the empty assistant message on error
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId))
      } finally {
        setIsLoading(false)
      }
    },
    [messages, isLoading, endpoint]
  )

  return {
    messages,
    sendMessage,
    isLoading,
    isLimeProcessing,
    limeHistory,
    error,
  }
}
