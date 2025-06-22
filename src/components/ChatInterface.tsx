"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"

import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { Send } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Loading from "./loading"

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
  mode: "general" | "summary"
}

export default function ChatInterface({ onSubmit, loading, mode }: ChatInterfaceProps) {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto"
      // Set height based on content, with min and max constraints
      const newHeight = Math.max(44, Math.min(textareaRef.current.scrollHeight, 120))
      textareaRef.current.style.height = `${newHeight}px`
    }
  }, [input])

  // Improved scroll behavior - scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [messages, loading])

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !loading) {
      e.preventDefault()
      handleSend()
    }
  }

  const hasAiMessages = messages.some((message) => message.sender === "ai")

  const inputComponent = (
    <div className="flex items-end gap-2">
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm overflow-auto"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Type your message...(Ctrl+Enter to send)"
          rows={1}
        />
      </div>
      <Button
        className="p-2 h-[44px] w-[44px] rounded-lg flex-shrink-0"
        onClick={handleSend}
        disabled={loading || !input.trim()}
      >
        <Send className="w-4 h-4" />
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
      {/* LIME Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/20" />

          {/* Loading Animation */}
          <div className="relative z-10 w-full h-full">
            <Loading />
          </div>
        </div>
      )}

      {messages.length === 0 ? (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-auto p-4 md:p-6 scrollbar-thin"
          style={{ paddingBottom: "6rem" }}
        >
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3">See AI with XeeAI</h1>
            <p className="text-gray-600 mb-6 font-geist font-bold">Your honest, explainable AI</p>

            {/* Tutorial section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left font-geist ">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">
                {mode === "general" ? "General Mode - How It Works" : "Summary Mode - How It Works"}
              </h2>
              <p className="mb-4">
                {mode === "general"
                  ? 'XeeAI is a general AI chatbot that is integrated with an Explainable AI (XAI) algorithm called LIME. You may use it just as any other regular chatbots, like asking "What\'s Machine Learning?" or "Explain quantum computing". Unlike other AI, XeeAI shows you how your input influenced its decisions.'
                  : "XeeAI Summary Mode specializes in creating concise summaries of long texts, articles, or documents using advanced AI with LIME explainability. Simply paste your text and ask for a summary. XeeAI will show you which parts of your input were most important for generating the summary."}
              </p>
              <p className="mb-4">
                {mode === "general"
                  ? "The explanation process works through the following steps:"
                  : "The summarization and explanation process works through the following steps:"}
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>It generates many variations of your input by masking or removing words and phrases.</li>
                <li>
                  For each variation, it generates a new {mode === "general" ? "response" : "summary"} and compares it
                  to the original {mode === "general" ? "response" : "summary"} using semantic similarity.
                </li>
                <li>
                  It analyzes which input parts caused the biggest changes — those are considered the most influential
                  for the {mode === "general" ? "response" : "summary"}.
                </li>
              </ol>
              <p className="mb-4">XeeAI will then turn those words with scores to a bar graph.</p>

              {/* Mode-specific examples */}
              <div className="bg-white border border-blue-100 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">
                  {mode === "general" ? "Example Questions:" : "Example Usage:"}
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {mode === "general" ? (
                    <>
                      <li>• "What is machine learning?"</li>
                      <li>• "Explain the concept of blockchain"</li>
                      <li>• "How does photosynthesis work?"</li>
                    </>
                  ) : (
                    <>
                      <li>• "Summarize this research paper: [paste text]"</li>
                      <li>• "Create a summary of this news article: [paste text]"</li>
                      <li>• "Condense this document into key points: [paste text]"</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                <p className="text-amber-800 font-medium">Note</p>
                <p className="text-amber-700 text-sm">
                  Like other chatbots, XeeAI can make mistakes on its {mode === "general" ? "responses" : "summaries"}.
                  {mode === "summary" && " For best results, provide clear, well-structured text to summarize."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin font-geist"
          style={{ paddingBottom: "6rem" }}
        >
          {/* Messaging Interface */}
          <div className={`mx-auto space-y-6 transition-all duration-300 ${hasAiMessages ? "max-w-2xl" : "max-w-3xl"}`}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs md:max-w-md p-4 rounded-lg ${getMessageBubbleStyle(message)}`}>
                  <div className={`prose max-w-none ${message.sender === "user" ? "text-white [&>*]:text-white" : ""}`}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} id="message-end" />
          </div>
        </div>
      )}

      {/* Fixed input bar at bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 z-10">
        <div className={`mx-auto transition-all duration-300 ${hasAiMessages ? "max-w-2xl" : "max-w-3xl"}`}>
          {inputComponent}
        </div>
        <p className="text-gray-600 text-center text-xs mt-5">
          XeeAI does make mistakes. Double-check the info.
        </p>
      </div>
    </div>
  )
}
