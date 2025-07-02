"use client"
import { useState } from "react"
import ChatInterface from "./ChatInterface"
import ExplanationPanel from "./ExplainablePanel"
import "highlight.js/styles/github.css"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText } from "lucide-react"

interface ExplanationData {
  original_output: string
  explanation: Array<[string, number]>
}

type Mode = "general" | "summary"

export default function Chatbot() {
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")
  const [mode, setMode] = useState<Mode>("general")
  const [explanation, setExplanation] = useState<ExplanationData | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const flaskBackend = process.env.NEXT_PUBLIC_FLASK_BACKEND as string;

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)
    setExplanation(null)
    setShowExplanation(false)

    try {
      const res = await fetch(`${flaskBackend}`, {
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

      if (res_data.explanation) {

        const explanationData = {
          original_output:
            res_data.explanation.originaloutput || res_data.explanation.original_output || res_data.ai_response,
          explanation: res_data.explanation.explanation || [],
        }
        setExplanation(explanationData)
        setShowExplanation(true)
      } else if (res_data.originaloutput && res_data.explanation) {
        // Handle direct LIME format
        const explanationData = {
          original_output: res_data.originaloutput,
          explanation: res_data.explanation,
        }
        setExplanation(explanationData)
        setShowExplanation(true)
      }

      // Return the AI response
      return (
        res_data.explanation?.originaloutput ||
        res_data.explanation?.original_output ||
        res_data.originaloutput ||
        res_data.ai_response ||
        "No response provided"
      )
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
    <div className="h-screen flex flex-col">
      {/* Mode Switcher Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900">XeeAI</h1>
            <span className="text-sm text-gray-500">with LIME Explanations</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-auto">
        {/* Chat Interface */}
        <div className={`${showExplanation ? "flex-1" : "w-full"} transition-all duration-300`}>
          <ChatInterface onSubmit={handleSubmit} loading={loading} mode={mode} />
        </div>

        {/* Explanation Panel */}
        {showExplanation && (
          <div className="w-96 transition-all duration-300">
            <ExplanationPanel explanation={explanation} mode={mode} />
          </div>
        )}
      </div>
    </div>
  )
}
