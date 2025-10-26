"use client"
import { useState, useMemo, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import ChatInterface from "./ChatInterface"
// import ExplanationPanel from "./ExplainablePanel"
import "highlight.js/styles/github.css"
// import { Button } from "@/components/ui/button"
// import { FileText, Info } from "lucide-react"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DefaultChatTransport } from "ai"



// LIME-related interfaces - commented out for now, keeping for future use
// interface ExplanationData {
//   original_output: string
//   explanation: Array<[string | number, number]>
//   intercept?: number // Optional: C-LIME intercept value
// }

export default function Chatbot() {
  // Using Vercel AI SDK's useChat hook with the UI Message Stream protocol

  // v5: manage input locally (hook no longer manages input internally)
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://127.0.0.1:8000/api/chat",
    }),

    prepareSendMessagesRequest: ({ messages }) => {
      const toText = (m: any) =>
        (m.parts || [])
          .filter((p: any) => p.type === "text" && typeof p.text === "string")
          .map((p: any) => p.text)
          .join("")

      const body = {
        messages: messages.map((m: any) => ({
          role: m.role,
          content: toText(m),
        })),
      }

      return { body }
    },

    // Transient "data-*" parts are only available here and not persisted in message.parts
    onData: (part) => {
      // Example: surface notifications or other transient data parts
      if (part.type === "data-notification") {
        // e.g., toast(part.data.message) or console.info
        console.info("[notification]", part.data?.level, part.data?.message)
      }
      // Log other custom parts as needed (e.g., data-search)
      if (String(part.type || "").startsWith("data-")) {
        console.debug("[data-part]", part.type, part)
      }
    },
  })

  // v5: derive loading from status
  const isLoading = status === "submitted" || status === "streaming"

  // Adapter: if ChatInterface expects a single "content" string per message,
  // derive it by concatenating text parts; keep all original comments intact.
  const messagesForUI = useMemo(
    () =>
      messages.map((m) => {
        const text =
          (m.parts || [])
            .filter((p: any) => p.type === "text" && typeof p.text === "string")
            .map((p: any) => p.text)
            .join("")
        return { ...m, content: text }
      }),
    [messages]
  )

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
      // sendMessage accepts a CreateUIMessage or string
      sendMessage({ text: value })
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
            // If ChatInterface supports parts, pass `messages`;
            // if it expects string content, pass `messagesForUI`.
            messages={messagesForUI}
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
