"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, HelpCircleIcon } from "lucide-react"

type LimeDataPoint = {
  feature: string
  weight: number
}

interface ExplanationPanelProps {
  aiDetails: {
    AIResponse: string
    LIMEOutput: Array<LimeDataPoint>
    localFidelity?: number | null
    rawPredictions?: number[]
  } | null
}

export default function ExplanationPanel({ aiDetails }: ExplanationPanelProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isUncertainResponse, setIsUncertainResponse] = useState(false)

  useEffect(() => {
    // Check if the AI response indicates uncertainty
    if (aiDetails?.AIResponse) {
      const uncertaintyPhrases = [
        "i don't know",
        "don't know",
        "cannot answer",
        "can't answer",
        "unable to",
        "not sure",
        "uncertain",
        "no information",
        "insufficient information",
        "out of topic",
      ]

      const lowerCaseResponse = aiDetails.AIResponse.toLowerCase()
      const isUncertain = uncertaintyPhrases.some((phrase) => lowerCaseResponse.includes(phrase))
      setIsUncertainResponse(isUncertain)
    }
  }, [aiDetails])

  if (!aiDetails) return null

  // Use real LIME data or empty array if uncertain
  const limeData = isUncertainResponse ? [] : aiDetails.LIMEOutput

  // Process raw predictions to create confidence scores
  // Default to uncertain if no predictions or uncertain response
  const getConfidenceScores = () => {
    if (isUncertainResponse || !aiDetails.rawPredictions || aiDetails.rawPredictions.length === 0) {
      return [
        { name: "Verified", value: 0, color: "#10b981" },
        { name: "Fake", value: 0, color: "#ef4444" },
        { name: "Uncertain", value: 100, color: "#f59e0b" },
      ]
    }

    // Convert raw predictions to percentages
    const total = aiDetails.rawPredictions.reduce((sum, val) => sum + val, 0)

    const scores = [
      {
        name: "Verified",
        value: (aiDetails.rawPredictions[0] / total) * 100,
        color: "#10b981",
      },
      {
        name: "Fake",
        value: (aiDetails.rawPredictions[1] / total) * 100,
        color: "#ef4444",
      },
    ]

    // Add uncertain if it exists in predictions
    if (aiDetails.rawPredictions.length > 2) {
      scores.push({
        name: "Uncertain",
        value: (aiDetails.rawPredictions[2] / total) * 100,
        color: "#f59e0b",
      })
    } else {
      // If no uncertain class in model, calculate as remainder to ensure total is 100%
      const sum = scores[0].value + scores[1].value
      if (sum < 100) {
        scores.push({
          name: "Uncertain",
          value: 100 - sum,
          color: "#f59e0b",
        })
      }
    }

    return scores
  }

  const confidenceScores = getConfidenceScores()

  // Determine verdict based on highest confidence score
  const verdict = isUncertainResponse
    ? { name: "Uncertain", value: 100, color: "#f59e0b" }
    : confidenceScores.reduce((prev, current) => (prev.value > current.value ? prev : current))

  const getVerdictDisplay = () => {
    switch (verdict.name) {
      case "Verified":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircleIcon className="h-5 w-5 text-green-600 mr-1" />,
          description: "This content appears to be reliable based on our analysis.",
        }
      case "Fake":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertTriangleIcon className="h-5 w-5 text-red-600 mr-1" />,
          description: "This content shows strong indicators of being false or misleading.",
        }
      default:
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <HelpCircleIcon className="h-5 w-5 text-amber-600 mr-1" />,
          description: isUncertainResponse
            ? "The AI couldn't analyze this content. It may be out of topic or require more context."
            : "We couldn't confidently determine the reliability of this content.",
        }
    }
  }

  const verdictDisplay = getVerdictDisplay()

  // Get local fidelity value with fallback
  const localFidelity =
    aiDetails.localFidelity !== undefined && aiDetails.localFidelity !== null ? aiDetails.localFidelity : 98 // Fallback value

  return (
    <Card className="h-full overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b pb-4">
        <CardTitle className="flex items-center text-xl">
          <InfoIcon className="mr-2 h-5 w-5 text-blue-600" />
          AI Explanation
        </CardTitle>
        <CardDescription>Analysis powered by LIME algorithm</CardDescription>
      </CardHeader>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start bg-transparent h-12 p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-12"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="lime"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none h-12"
              disabled={isUncertainResponse || limeData.length === 0}
            >
              LIME Details
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-0">
          <TabsContent value="overview" className="m-0 p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">AI RESPONSE</h3>
              <p className="p-3 bg-gray-50 rounded-md text-gray-800">{aiDetails.AIResponse}</p>
            </div>

            {isUncertainResponse ? (
              <div className="bg-amber-50 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <HelpCircleIcon className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="font-medium text-amber-800">Unable to Analyze</h3>
                </div>
                <p className="text-sm text-amber-700">
                  The AI couldn't analyze this content. It may be out of topic, contain nonsensical text, or require
                  more context.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">AI VERDICT</h3>
                  <div className="flex items-center mb-2">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${verdictDisplay.color}`}
                    >
                      {verdictDisplay.icon}
                      {verdict.name}
                    </div>
                    <span className="ml-2 text-lg font-bold">{verdict.value.toFixed(1)}%</span>
                  </div>
                  <p className="text-sm text-gray-600">{verdictDisplay.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">CONFIDENCE SCORES</h3>
                  <div className="space-y-2">
                    {confidenceScores.map((score) => (
                      <div key={score.name} className="flex items-center">
                        <div className="w-24 text-sm">{score.name}</div>
                        <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${score.value}%`,
                              backgroundColor: score.color,
                              minWidth: score.value > 0 ? "8px" : "0",
                            }}
                          />
                        </div>
                        <div className="w-12 text-right text-sm ml-2">{score.value.toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {aiDetails.localFidelity !== undefined && aiDetails.localFidelity !== null && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">EXPLANATION QUALITY</h3>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        Local Fidelity: {(localFidelity * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="lime" className="m-0 p-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">LIME OUTPUT</h3>
              {limeData.length > 0 ? (
                <div className="h-[350px] overflow-visible">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={limeData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <YAxis
                        dataKey="feature"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        width={80}
                        tick={{ fontSize: 12 }}
                      />
                      <XAxis dataKey="weight" type="number" tickFormatter={(value) => value.toFixed(5)} />
                      <Tooltip
                        formatter={(value: number) => [value.toFixed(5), "Weight"]}
                        labelFormatter={(label) => `Feature: ${label}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          border: "1px solid rgba(209, 213, 219, 0.5)",
                        }}
                      />
                      <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                        {limeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.weight > 0 ? "#3b82f6" : "#ef4444"} />
                        ))}
                        <LabelList
                          dataKey="weight"
                          position="right"
                          formatter={(value: number) => value.toFixed(5)}
                          style={{ fontSize: 11 }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">No LIME data available</div>
              )}

              <div className="mt-6 bg-blue-50 p-4 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">Understanding LIME Output</h4>
                <p className="text-sm text-blue-700">
                  The chart above shows which words or phrases influenced the AI's decision. Longer bars indicate
                  stronger influence. Blue bars support the verdict, while red bars contradict it.
                </p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
