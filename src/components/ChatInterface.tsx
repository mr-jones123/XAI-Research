"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { Send, Bot, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Loading from "./loading"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Message {
  sender: "user" | "ai" | "web-search"
  text: string
  type?: "normal" | "web-search"
  timestamp?: Date
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
      textareaRef.current.style.height = "auto"
      const newHeight = Math.max(44, Math.min(textareaRef.current.scrollHeight, 120))
      textareaRef.current.style.height = `${newHeight}px`
    }
  }, [input])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const ai_Response = await onSubmit(input)
      const ai_Message: Message = {
        sender: "ai",
        text: ai_Response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, ai_Message])
    } catch (error) {
      const errorMessage: Message = {
        sender: "ai",
        text: `Sorry, something went wrong. ${error}`,
        timestamp: new Date(),
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

  const getMessageBubbleStyle = (message: Message) => {
    if (message.sender === "user") {
      return "bg-blue-600 text-white border-blue-600"
    } else if (message.sender === "web-search") {
      return "bg-green-50 text-green-900 border-green-200"
    } else {
      return "bg-gray-50 text-gray-900 border-gray-200"
    }
  }

  return (
    <div className="flex flex-col h-full w-full relative bg-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-md bg-black/20" />
          <div className="relative z-10 w-full h-full">
            <Loading />
          </div>
        </div>
      )}

      {/* Messages Area */}
      {messages.length === 0 ? (
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"
          style={{ paddingBottom: "8rem" }}
        >
          <div className="w-full max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">See AI with XeeAI</h1>
              <p className="text-gray-600 text-base sm:text-lg font-bold">Your honest, explainable AI</p>
            </div>

            {/* Tutorial Section */}
            <Card className="bg-blue-50 border-blue-200 p-4 sm:p-6 lg:p-8 text-left">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-800 mb-4">
                {mode === "general" ? "General Mode - How It Works" : "Summary Mode - How It Works"}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-blue-900">
                <p>
                  {mode === "general"
                    ? 'XeeAI is a general AI chatbot that is integrated with an Explainable AI (XAI) algorithm called LIME. You may use it just as any other regular chatbots, like asking "What\'s Machine Learning?" or "Explain quantum computing". Unlike other AI, XeeAI shows you how your input influenced its decisions.'
                    : "XeeAI Summary Mode specializes in creating concise summaries of long texts, articles, or documents using advanced AI with LIME explainability. Simply paste your text and ask for a summary. XeeAI will show you which parts of your input were most important for generating the summary."}
                </p>

                <p>
                  {mode === "general"
                    ? "The explanation process works through the following steps:"
                    : "The summarization and explanation process works through the following steps:"}
                </p>

                <ol className="list-decimal pl-5 space-y-2">
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

                <p>XeeAI will then turn those words with scores to a bar graph.</p>

                {/* Examples */}
                <Card className="bg-white border-blue-100 p-4 mt-4">
                  <h3 className="font-semibold text-blue-800 mb-3">
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
                </Card>

                {/* Disclaimer */}
                <Card className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
                  <p className="text-amber-800 font-medium mb-1">Note</p>
                  <p className="text-amber-700 text-sm">
                    Like other chatbots, XeeAI can make mistakes on its {mode === "general" ? "responses" : "summaries"}
                    .{mode === "summary" && " For best results, provide clear, well-structured text to summarize."}
                  </p>
                </Card>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ paddingBottom: "8rem" }}>
          <div
            className={`mx-auto space-y-4 sm:space-y-6 transition-all duration-300 ${
              hasAiMessages ? "max-w-3xl lg:max-w-4xl" : "max-w-4xl"
            }`}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex gap-3 sm:gap-4", message.sender === "user" ? "justify-end" : "justify-start")}
              >
                {/* AI Avatar */}
                {message.sender === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <Card className={cn("max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 border", getMessageBubbleStyle(message))}>
                  <div
                    className={cn(
                      "prose max-w-none text-sm sm:text-base",
                      message.sender === "user" ? "text-white [&>*]:text-white" : "",
                    )}
                  >
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message.text}</ReactMarkdown>
                  </div>
                  {message.timestamp && (
                    <div
                      className={cn(
                        "text-xs mt-2 opacity-70",
                        message.sender === "user" ? "text-blue-100" : "text-gray-500",
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </Card>

                {/* User Avatar */}
                {message.sender === "user" && (
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6">
        <div
          className={`mx-auto transition-all duration-300 ${hasAiMessages ? "max-w-3xl lg:max-w-4xl" : "max-w-4xl"}`}
        >
          <div className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                className="w-full p-3 sm:p-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm sm:text-base overflow-auto"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Type your message... (Ctrl+Enter to send)"
                rows={1}
              />
            </div>
            <Button
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg flex-shrink-0"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          <p className="text-gray-600 text-center text-xs sm:text-sm mt-3 sm:mt-4">
            XeeAI does make mistakes. Double-check the info.
          </p>
        </div>
      </div>
    </div>
  )
}
