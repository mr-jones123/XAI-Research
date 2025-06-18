"use client"
import { useState } from "react"
import ChatInterface from "@/components/ChatInterface"
import ExplanationPanel from "./ExplanationPanel"

type LimeDataPoint = {
  feature: string
  weight: number
}

type ChatbotProps = {
  chatId: string
}

interface ResponseType {
  aiDetails: {
    AIResponse: string
    LIMEOutput: Array<LimeDataPoint>
    localFidelity?: number | null
    rawPredictions?: number[]
    ood_score?: number | null  // Changed from ood_detection to ood_score to match backend
  } | null
}

export default function Chatbot() {
  const [response, setResponse] = useState<ResponseType | null>(null)
  const [loading, setLoading] = useState(false)
  const [webSearchLoading, setWebSearchLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FLASK_ENDPOINT as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const text = await res.text()

      if (!text) {
        throw new Error("Empty response from server")
      }

      const data = JSON.parse(text)

      // Transform the data from backend format to match your ResponseType interface
      const formattedResponse: ResponseType = {
        aiDetails: {
          AIResponse: data.AIResponse || "No response provided",
          LIMEOutput: data.LIMEOutput || [],
          localFidelity: data.localFidelity || null,
          rawPredictions: data.rawPredictions || [],
          ood_score: data.ood_score || null, // Add OOD score handling
        },
      }

      setResponse(formattedResponse)

      if (data.LIMEOutput) {
        console.log("Parsed LIME Output:", data.LIMEOutput)
      } else {
        console.log("No LIME output available in response")
      }

      // Return just the AI response for the chat display
      return data.AIResponse || "No response provided"
    } catch (error) {
      console.error("Error fetching data:", error)
      return "Sorry, something went wrong. Please try again later."
    } finally {
      setLoading(false)
    }
  }

  const handleWebSearch = async (query: string): Promise<void> => {
    setWebSearchLoading(true)

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error("Web search failed")
      }

      const data = await response.json()

      // Add web search message to chat
      if (window.addWebSearchMessage) {
        let searchResultText = "🔍 Here are some relevant sources I found:\n\n"

        if (data && data.length > 0) {
          data.forEach((result: { title: string; url: string; summary: string }, index: number) => {
            searchResultText += `📰 ${result.title}\n`
            searchResultText += `📝 ${result.summary}\n`
            searchResultText += `🔗 ${result.url}\n`
            if (index < data.length - 1) {
              searchResultText += "\n---\n\n"
            }
          })
        } else {
          searchResultText = "I couldn't find any related sources for this query."
        }

        window.addWebSearchMessage(searchResultText)
      }
    } catch (error) {
      console.error("Web search error:", error)
      if (window.addWebSearchMessage) {
        window.addWebSearchMessage("Sorry, I encountered an error while searching the web. Please try again later.")
      }
    } finally {
      setWebSearchLoading(false)
    }
  }

  return (
    <div className="flex max-w-7xl mx-auto p-4 h-[100dvh] gap-4">
      <div className={response ? "flex-1" : "w-full"}>
        <ChatInterface
          onSubmit={handleSubmit}
          loading={loading}
          webSearchLoading={webSearchLoading}
          onWebSearchMessage={(message) => {
            // This prop is used to expose the message adding function
          }}
        />
      </div>

      {response?.aiDetails && (
        <div className="w-[350px] hidden md:block">
          <ExplanationPanel
            aiDetails={response.aiDetails}
            userQuery={currentQuery}
            onWebSearch={handleWebSearch}
            webSearchLoading={webSearchLoading}
          />
        </div>
      )}
    </div>
  )
}
