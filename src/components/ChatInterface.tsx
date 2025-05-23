"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import LoadingFacts from "./loading-facts"

interface Message {
  sender: "user" | "ai"
  text: string
}

interface ChatInterfaceProps {
  onSubmit: (input: string) => Promise<string>
  loading: boolean
}

export default function ChatInterface({ onSubmit, loading }: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault()
      handleSend()
    }
  }

  const inputComponent = (
    <div className="relative">
      <Input
        className="w-full p-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={loading}
      />
      <Button
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 z-5 w-8 h-8 rounded-full"
        onClick={handleSend}
        disabled={loading || !input.trim()}
      >
        <Send className="w-4 h-4"></Send>
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen relative">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-start flex-1 p-4 md:p-6 pt-12">
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3">Welcome to XeeAI</h1>
            <p className="text-gray-600 mb-6 font-geist font-bold">Your AI assistant for identifying fake news in captions</p>

            {/* Tutorial section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left font-geist">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">How It Works</h2>
              <p className="mb-4">
                XeeAI analyzes articles from political, entertainment, and opinion articles to classify whether it comes from a <span className="font-bold">verified source</span> or a <span className="font-bold">fake one. </span>
                 After that, the Explainable AI Algorithm <span className="font-bold"> LIME (Local Interpretable Model Explanations)</span> will do the following:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Analyze the text for indicators of misinformation</li>
                <li>Provide an assessment of its authenticity</li>
                <li>Show which words or phrases influenced the decision</li>
              </ol>
              <p className="mb-4">
                In this way, you can understand how your input affects the model's decision. 
              </p>

              {/* Disclaimer */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                <p className="text-amber-800 font-medium">Disclaimer</p>
                <p className="text-amber-700 text-sm">
                  XeeAI is an AI tool and can make mistakes. Always verify information from multiple reliable sources.
                </p>
              </div>
            </div>

            {/* Example prompts */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3">Try these examples:</h3>
              <div className="grid gap-2 md:grid-cols-2 max-w-2xl mx-auto font-geist">
                {[
                  "Inaresto ng anti-scalawag and intelligence units ng Philippine National Police (PNP) ang isang anti-drug operative ng Pasay City Police Station ngayong araw, matapos na isangkot sa extortion at kidnapping.",
                  "Puro mapapaklang komento ang ipinakakain ngayon sa isang pamosong female personality ng mismong mga tagahanga niya. Pinasukan ng kawalan ng utang na loob at pangtatraydor pa nga ang kanilang emosyon",
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
        <div className="flex-1 overflow-y-auto pb-24 p-4 md:p-6 scrollbar-thin">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md p-4 rounded-lg ${
                    message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {message.text}
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

            <div ref={messagesEndRef} id="message-end" />
          </div>
        </div>
      )}

      {/* Fixed input bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 z-10">
        <div className="max-w-3xl mx-auto">{inputComponent}</div>
      </div>
    </div>
  )
}
