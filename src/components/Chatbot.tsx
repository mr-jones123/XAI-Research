"use client"
import { useState, useCallback } from "react"
import { useStreamingChat } from "@/hooks/useStreamingChat"
import ChatInterface from "./ChatInterface"
// import ExplanationPanel from "./ExplainablePanel"
import "highlight.js/styles/github.css"
// import { Button } from "@/components/ui/button"
// import { FileText, Info } from "lucide-react"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"



// LIME-related interfaces - commented out for now, keeping for future use
// interface ExplanationData {
//   original_output: string
//   explanation: Array<[string | number, number]>
//   intercept?: number // Optional: C-LIME intercept value
// }

export default function Chatbot() {
  // Using custom streaming hook with Google Genai
  const [input, setInput] = useState("")

  const { messages, sendMessage, isLoading } = useStreamingChat()

  // Preserve the original handler prop shapes expected by ChatInterface
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const value = input.trim()
      if (!value) return
      sendMessage(value)
      setInput("")
    },
    [input, sendMessage]
  )

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="flex items-center space-x-3">
                <img
                  src="/XeeAI Logo (Draft).svg"
                  alt="XeeAI Logo"
                  className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">XeeAI</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">with LIME Explanations</p>
                </div>
              </div>
            </div>

            {/* Actions - LIME Explanation Controls commented out for now */}
            {/* (kept exactly as provided) */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Interface */}
        <div className="w-full transition-all duration-300">
          <ChatInterface
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            mode="general"
          />
        </div>

        {/* Desktop Explanation Panel - commented out for now */}
        {/* (kept exactly as provided) */}
      </div>
    </div>
  )
}
