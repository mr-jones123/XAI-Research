"use client"
import { useState } from "react"
import ChatInterface from "@/components/ChatInterface"
import ReactMarkdown from "react-markdown"
import "highlight.js/styles/github.css" // choose a style you like

interface aiDetails {
  aiResponse: string
}

interface ResponseType {
  flask_response : aiDetails | null

}

export default function Chatbot() {
  const [response, setResponse] = useState<ResponseType | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)

    try {
      const res = await fetch("https://model-service-173588213822.asia-southeast1.run.app/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      // Check if the response is ok
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const res_data = await res.json()

      return res_data.ai_response || "No response provided"
    } catch (error) {
      console.error("Error fetching data:", error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return "Unable to connect to the AI service."
      }
      return `Sorry, something went wrong: ${error instanceof Error ? error.message : 'Unknown error'}`
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-7xl mx-auto p-4 h-[100dvh] gap-4">
      <div className={response ? "flex-1" : "w-full"}>
        <ChatInterface
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}
