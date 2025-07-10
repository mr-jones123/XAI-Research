"use client"
import { useState } from "react"
import ChatInterface from "./ChatInterface"
import ExplanationPanel from "./ExplainablePanel"
import "highlight.js/styles/github.css"
import { Button } from "@/components/ui/button"
import { MessageSquare, FileText, Info } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ExplanationData {
  original_output: string
  explanation: Array<[string | number, number]>
}

export default function Chatbot() {
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")
  const [explanation, setExplanation] = useState<ExplanationData | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [mobileExplanationOpen, setMobileExplanationOpen] = useState(false)

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)
    setExplanation(null)
    setShowExplanation(false)
    setMobileExplanationOpen(false)

    try {
      const res = await fetch("http://localhost:8000/", {
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

      if (res_data.explanation) {
        const explanationData = {
          original_output: res_data.explanation.original_output || res_data.response,
          explanation: res_data.explanation.explanation || [],
        }
        setExplanation(explanationData)
        setShowExplanation(true)
      } else if (res_data.originaloutput && res_data.explanation) {
        const explanationData = {
          original_output: res_data.originaloutput,
          explanation: res_data.explanation,
        }
        setExplanation(explanationData)
        setShowExplanation(true)
      }

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
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">XeeAI</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">with LIME Explanations</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Explanation Controls */}
              {explanation && (
                <>
                  {/* Mobile Sheet */}
                  <div className="block xl:hidden">
                    <Sheet open={mobileExplanationOpen} onOpenChange={setMobileExplanationOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 sm:h-9 px-2 sm:px-3 bg-transparent">
                          <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          <span className="text-xs sm:text-sm">Explain</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="bottom" className="h-[85vh] p-0">
                        <div className="flex flex-col h-full">
                          <SheetHeader className="p-4 border-b flex-shrink-0">
                            <SheetTitle className="flex items-center space-x-2 text-left">
                              <FileText className="h-5 w-5" />
                              <span>LIME Explanation</span>
                            </SheetTitle>
                          </SheetHeader>
                          <div className="flex-1 overflow-hidden">
                            <ExplanationPanel explanation={explanation} isMobile={true} mode="general" />
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Desktop Toggle */}
                  <Button
                    variant={showExplanation ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="hidden xl:flex h-9 px-3"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    {showExplanation ? "Hide" : "Show"} Explanation
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Interface */}
        <div
          className={`w-full xl:flex-1 ${showExplanation ? "xl:border-r xl:border-gray-200" : ""} transition-all duration-300`}
        >
          <ChatInterface onSubmit={handleSubmit} loading={loading} mode="general" />
        </div>

        {/* Desktop Explanation Panel */}
        {showExplanation && explanation && (
          <div className="hidden xl:block w-96 2xl:w-[28rem] bg-white transition-all duration-300">
            <ExplanationPanel explanation={explanation} isMobile={false} mode="general" />
          </div>
        )}
      </div>
    </div>
  )
}
