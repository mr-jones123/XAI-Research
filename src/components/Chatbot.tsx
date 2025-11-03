"use client"
import { useState, useCallback } from "react"
import { useStreamingChat, type LimeHistoryItem } from "@/hooks/useStreamingChat"
import ChatInterface from "./ChatInterface"
import ExplanationPanel from "./ExplainablePanel"
import { Card } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Brain, Clock, BarChart3 } from "lucide-react"
import "highlight.js/styles/github.css"

export default function Chatbot() {
  // Using custom streaming hook with Google Genai
  const [input, setInput] = useState("")
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<LimeHistoryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { messages, sendMessage, isLoading, isLimeProcessing, limeHistory } = useStreamingChat()

  const handleHistoryClick = (item: LimeHistoryItem) => {
    setSelectedHistoryItem(item)
    setIsDialogOpen(true)
  }

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
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Interface */}
        <div className={`transition-all duration-300 ${limeHistory.length > 0 || isLimeProcessing ? "lg:w-2/3" : "w-full"}`}>
          <ChatInterface
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            mode="general"
          />
        </div>

        {/* LIME History Sidebar */}
        {(limeHistory.length > 0 || isLimeProcessing) && (
          <div className="hidden lg:flex lg:w-1/3 border-l border-gray-200 flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-xai-honolulu dark:text-xai-pacific" />
                <h2 className="text-lg font-semibold text-gray-900">LIME History</h2>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {limeHistory.length} explanation{limeHistory.length !== 1 ? 's' : ''}
                {isLimeProcessing && " • Processing..."}
              </p>
            </div>

            {/* History List (scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* LIME Processing Indicator */}
              {isLimeProcessing && (
                <Card className="p-4 bg-xai-lightcyan dark:bg-xai-marian border-xai-nonphoto dark:border-xai-honolulu">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-xai-honolulu dark:border-xai-pacific"></div>
                    <div>
                      <p className="text-sm font-medium text-xai-marian dark:text-xai-lightcyan">Analyzing with LIME...</p>
                      <p className="text-xs text-xai-honolulu dark:text-xai-nonphoto mt-1">This may take a few moments</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* History Cards */}
              {limeHistory.map((item, index) => (
                <Card
                  key={item.id}
                  className="p-3 cursor-pointer transition-all hover:shadow-md hover:bg-gray-50 hover:border-xai-pacific dark:hover:border-xai-vivid"
                  onClick={() => handleHistoryClick(item)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-xai-honolulu dark:text-xai-pacific">#{limeHistory.length - index}</span>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    <span className="font-medium">Q:</span> {item.userMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {item.explanation.explanation.length} feature{item.explanation.explanation.length !== 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center text-xs text-xai-honolulu dark:text-xai-pacific font-medium">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Graph
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIME Explanation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-xai-honolulu dark:text-xai-pacific" />
              <span>LIME Explanation</span>
            </DialogTitle>
          </DialogHeader>

          {selectedHistoryItem && (
            <div className="flex-1 overflow-y-auto">
              {/* Question & Answer Context */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">User Question:</p>
                  <p className="text-sm text-gray-900">{selectedHistoryItem.userMessage}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">AI Response:</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{selectedHistoryItem.assistantMessage}</p>
                </div>
              </div>

              {/* Explanation Panel */}
              <ExplanationPanel
                explanation={selectedHistoryItem.explanation}
                mode="general"
                isDialog={true}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
