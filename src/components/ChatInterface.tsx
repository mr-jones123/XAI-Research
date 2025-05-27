"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { Search } from "lucide-react" // Import Search component

import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import LoadingFacts from "./loading-facts"
import LoadingWebSearch from "./loading-web-search"

interface Message {
  sender: "user" | "ai" | "web-search"
  text: string
  type?: "normal" | "web-search"
}

interface ChatInterfaceProps {
  onSubmit: (input: string) => Promise<string>
  loading: boolean
  webSearchLoading?: boolean
  onWebSearchMessage?: (message: string) => void
}

export default function ChatInterface({
  onSubmit,
  loading,
  webSearchLoading = false,
  onWebSearchMessage,
}: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Improved scroll behavior - scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated before scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [messages, loading, webSearchLoading])

  // Additional scroll handler for when the container resizes
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    })

    if (messagesContainerRef.current) {
      observer.observe(messagesContainerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Expose method to add web search messages
  useEffect(() => {
    if (onWebSearchMessage) {
      // Store the function to add web search messages
      window.addWebSearchMessage = (message: string) => {
        const webSearchMessage: Message = {
          sender: "web-search",
          text: message,
          type: "web-search",
        }
        setMessages((prev) => [...prev, webSearchMessage])
      }
    }

    return () => {
      if (window.addWebSearchMessage) {
        delete window.addWebSearchMessage
      }
    }
  }, [onWebSearchMessage])

  const handleSend = async () => {
    if (!input.trim()) {
      return
    }

    const userMessage: Message = { sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])

    setInput("")

    try {
      const ai_Response = await onSubmit(input)
      const ai_Message: Message = { sender: "ai", text: ai_Response }
      setMessages((prev) => [...prev, ai_Message])
    } catch (error) {
      const errorMessage: Message = {
        sender: "ai",
        text: `Sorry, something went wrong. ${error}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && !webSearchLoading) {
      e.preventDefault()
      handleSend()
    }
  }

  // Check if there are AI messages to determine if right sidebar might be present
  const hasAiMessages = messages.some((message) => message.sender === "ai")

  const inputComponent = (
    <div className="relative">
      <Input
        className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={webSearchLoading ? "Web search in progress..." : "Type your message..."}
        disabled={loading || webSearchLoading}
      />
      <Button
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 z-5 w-8 h-8 rounded-full"
        onClick={handleSend}
        disabled={loading || webSearchLoading || !input.trim()}
      >
        <Send className="w-4 h-4"></Send>
      </Button>
    </div>
  )

  const getMessageBubbleStyle = (message: Message) => {
    if (message.sender === "user") {
      return "bg-blue-500 text-white"
    } else if (message.sender === "web-search") {
      return "bg-green-100 text-green-900 border border-green-200"
    } else {
      return "bg-gray-200 text-gray-900"
    }
  }

  return (
    <div className="flex flex-col h-full w-full relative">
      {messages.length === 0 ? (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin"
          style={{ paddingBottom: "6rem" }}
        >
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3">Welcome to XeeAI</h1>
            <p className="text-gray-600 mb-6 font-geist font-bold">
              Your AI assistant for identifying fake news in captions
            </p>

            {/* Tutorial section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left font-geist">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">How It Works</h2>
              <p className="mb-4">
                XeeAI analyzes articles from political, entertainment, and opinion articles to classify whether it comes
                from a <span className="font-bold">verified source</span> or a{" "}
                <span className="font-bold">fake one. </span>
                After that, the Explainable AI Algorithm{" "}
                <span className="font-bold"> LIME (Local Interpretable Model Explanations)</span> will do the following:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Approximates the behavior of the XeeAI</li>
                <li>Generates variations of your input to see the change of AI output</li>
                <li>
                  Show which words or phrases influenced the AI's decision whether the input is{" "}
                  <span className="font-bold">verified or not.</span>
                </li>
              </ol>
              <p className="mb-4">In this way, you can understand how your input affects the model's decision.</p>

              {/* Disclaimer */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                <p className="text-amber-800 font-medium">Note</p>
                <p className="text-amber-700 text-sm">
                  While XeeAI provides valuable insights, please note that our training data doesn't include the most recent news. 
                  We recommend cross-referencing with current sources for the latest information.
                </p>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                <p className="text-amber-800 font-medium">Another Note</p>
                <p className="text-amber-700 text-sm">
                    The LIME Algorithm perturbs your input so the longer the text you use (which is totally okay), the longer the response might be. So please bear with us :DD
                </p>
              </div>
            </div>

            {/* Example prompts */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Try these examples:</h3>
              <div className="grid gap-2 md:grid-cols-2 max-w-2xl mx-auto font-geist">
                {[
                  "Kasama sa programa ang pananalangin, bulaklak at pagsindi ng kandila para sa mga biktima ng massacre. Makikibahagi ang iba ibang kasapi ng media at ang grupo ng National Union of Journalists of the Philippines (NUJP). Ang hindi makakasama na mga kaanak ng Maguindanao massacre victims ngayong Sabado ay inaasahang bukas na lamang tutungo sa site kasama si Department of Secretary (DoJ) Secretary Leila De Lima.",
                  "May bagong paandar ang mga anti-DU30, at ito ay pag-po-post ng mga black and white videos ng mga peronalidad sa mundong showbiz at sining kung saan pinahahapyawan nila ang Duterte Administration. Ngunit sa serye ng mga videos na kanilang inilathala sa kanilang Facebook page, ang video ni Director Joel Lamangan ang pinagpiyestahan ng husto ng mga netizens.",
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(example)
                    }}
                    className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin"
          style={{ paddingBottom: "6rem" }}
        >
          <div className={`mx-auto space-y-6 transition-all duration-300 ${hasAiMessages ? "max-w-2xl" : "max-w-3xl"}`}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs md:max-w-md p-4 rounded-lg ${getMessageBubbleStyle(message)}`}>
                  {message.type === "web-search" ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="w-4 h-4" />
                        <span className="font-medium text-sm">Web Search Results</span>
                      </div>
                      <div className="text-sm">
                        {message.text.split('\n').map((line, lineIndex) => {
                          const trimmedLine = line.trim();
                          if (!trimmedLine) return null;
                          
                          return (
                            <div key={lineIndex} className="flex items-start gap-2 mb-1">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{trimmedLine}</span>
                            </div>
                          );
                        }).filter(Boolean)}
                      </div>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-md w-full">
                  <LoadingFacts />
                </div>
              </div>
            )}

            {webSearchLoading && (
              <div className="flex justify-start">
                <div className="max-w-md w-full">
                  <LoadingWebSearch />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} id="message-end" />
          </div>
        </div>
      )}

      {/* Fixed input bar at bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 z-10">
        <div className={`mx-auto transition-all duration-300 ${hasAiMessages ? "max-w-2xl" : "max-w-3xl"}`}>
          {inputComponent}
        </div>
      </div>
    </div>
  )
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    addWebSearchMessage?: (message: string) => void
  }
}
