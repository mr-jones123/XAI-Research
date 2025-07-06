"use client"

import { useState } from "react"
import ChatInterface from "./ChatInterface"
import "highlight.js/styles/github.css"
import { MessageSquare } from "lucide-react"

interface ExplanationData {
  original_output: string
  explanation: Array<[string | number, number]>
}

export default function Chatbot() {
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FLASK_BACKEND as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const res_data = await res.json()
      console.log("Received data from backend:", res_data)

      return res_data.response || res_data.explanation?.original_output || "No response provided"
    } catch (error) {
      console.error("Error fetching data:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        return "Unable to connect to the AI service."
      }
      return `Sorry, something went wrong: ${error instanceof Error ? error.message : "Unknown error"}`
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">XeeAI</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">AI Assistant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full">
          <ChatInterface onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  )
}
