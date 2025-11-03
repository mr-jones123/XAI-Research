"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, BarChart3, Info } from "lucide-react"
import BibTEX  from "./Bibtex"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" // Add this import

interface ExplanationData {
  original_output: string
  explanation: Array<[string | number, number]>
  intercept?: number // C-LIME intercept (baseline score)
}

interface ExplanationPanelProps {
  explanation: ExplanationData | null
  mode: "general" | "summary"
  isMobile?: boolean
  isDialog?: boolean // New prop to detect if rendered in dialog
}

export default function ExplanationPanel({ explanation, mode, isMobile = false, isDialog = false }: ExplanationPanelProps) {

  const chartData =
    explanation?.explanation?.map(([feature, importance], index) => {
      const featureText = typeof feature === "string" ? feature : feature.toString()
      const cleanFeature = featureText.trim()

      return {
        id: index,
        feature: cleanFeature.substring(0, 25) + (cleanFeature.length > 25 ? "..." : ""),
        fullFeature: cleanFeature,
        importance: typeof importance === "number" ? importance : Number.parseFloat(importance),
        absImportance: Math.abs(typeof importance === "number" ? importance : Number.parseFloat(importance)),
        color:
          (typeof importance === "number" ? importance : Number.parseFloat(importance)) > 0
            ? "#10b981"
            : "#ef4444",
      }
    }) || []

  const sortedData = [...chartData].sort((a, b) => b.absImportance - a.absImportance)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs z-50">
          <p className="text-sm font-medium text-gray-900 mb-1">"{data.fullFeature}"</p>
          <p className="text-sm text-gray-600">
            Influence:{" "}
            <span className="font-medium">
              {data.importance > 0 ? "+" : ""}
              {data.importance.toFixed(4)}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.importance > 0 ? "Positive influence" : "Negative influence"}
          </p>
        </div>
      )
    }
    return null
  }

  if (!explanation) return null

  if (!explanation.explanation || !Array.isArray(explanation.explanation) || explanation.explanation.length === 0) {
    return (
      <div className={`w-full ${isDialog ? '' : 'max-w-md border-l border-gray-200'} bg-white flex flex-col h-full p-4`}>
        <div className="text-center text-gray-500">
          <Brain className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No explanation data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${isDialog ? '' : 'max-w-md border-l border-gray-200'} bg-white flex flex-col ${isDialog ? '' : 'h-full'}`}>
      {/* Header - Only show in sidebar, not in dialog */}
      {!isDialog && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-xai-honolulu dark:text-xai-pacific" />
            <h2 className="text-lg font-semibold text-gray-900">LIME Explanation</h2>
          </div>
          <p className="text-sm text-gray-600 font-geist">
            {mode === "general"
              ? "How your input influenced the AI's response"
              : "Which parts of your text were most important for the summary"}
          </p>
        </div>
      )}

      {/* Content */}
      <div className={`${isDialog ? '' : 'flex-1 overflow-auto'} ${isDialog ? 'space-y-6' : 'p-4 space-y-4'}`}>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xl">Feature Importance ({sortedData.length} features)</span>
              </span>
              {/* Dialog Trigger Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition">
                    View Larger
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-screen-lg max-h-screen overflow-auto">
                  {/* Accessible title - visually hidden */}
                  <VisuallyHidden asChild>
                    <DialogTitle>Feature Importance Chart</DialogTitle>
                  </VisuallyHidden>

                  {/* Optional description - visually hidden */}
                  <VisuallyHidden asChild>
                    <DialogDescription>
                      This chart shows the most important text segments influencing the AI response.
                    </DialogDescription>
                  </VisuallyHidden>

                  <div className="w-full h-[600px] font-geist">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sortedData}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 100,
                          left: -30,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                          type="number"
                          tick={{ fontSize: 10 }}
                          axisLine={{ strokeWidth: 1 }}
                          tickLine={false}
                          domain={[0, Math.max(...sortedData.map((d) => d.absImportance)) * 1.1]}
                        />
                        <YAxis
                          type="category"
                          dataKey="feature"
                          width={120}
                          tick={{ fontSize: 10 }}
                          interval={0}
                          axisLine={{ strokeWidth: 1 }}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="absImportance"
                          radius={[0, 4, 4, 0]}
                          barSize={12}
                          isAnimationActive={true}
                        >
                          {sortedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full font-geist">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 60,
                    left: -30,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10 }}
                    axisLine={{ strokeWidth: 1 }}
                    tickLine={false}
                    domain={[0, Math.max(...sortedData.map((d) => d.absImportance)) * 1.1]}
                  />
                  <YAxis
                    type="category"
                    dataKey="feature"
                    width={120}
                    tick={{ fontSize: 10 }}
                    interval={0}
                    axisLine={{ strokeWidth: 1 }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="absImportance"
                    radius={[0, 4, 4, 0]}
                    barSize={12}
                    isAnimationActive={true}
                  >
                    {sortedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Positive influence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>Negative influence</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Segments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Top Influential Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto font-geist">
              {sortedData.slice(0, 5).map((item, index) => (
                <div key={index} className="text-xs p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-700">#{index + 1}</span>
                    <span className={`font-medium ${item.importance > 0 ? "text-green-600" : "text-red-600"}`}>
                      {item.importance > 0 ? "+" : ""}
                      {item.importance.toFixed(3)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">"{item.fullFeature}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interpretation */}
        <Card>
          <CardContent className="pt-4">
            <div className="text-md  text-gray-600 space-y-2">
              <p>
                <strong>How to read this:</strong> Longer bars indicate stronger influence on the AI's{" "}
                {mode === "general" ? "response" : "summary"}.
              </p>
              <p>
                <strong>Green bars:</strong> Text that supported the current response.
              </p>
              <p>
                <strong>Red bars:</strong> Text that worked against alternative responses.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* C-LIME Intercept */}
        {explanation.intercept !== undefined && (
          <Card className="bg-xai-lightcyan dark:bg-xai-marian border-xai-nonphoto dark:border-xai-honolulu">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Info className="w-4 h-4 text-xai-honolulu dark:text-xai-pacific" />
                <span>Baseline Score (Intercept)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-md text-gray-700 space-y-2">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-xai-federal rounded-lg border border-xai-nonphoto dark:border-xai-honolulu">
                  <span className="font-medium dark:text-xai-nonphoto">Intercept Value:</span>
                  <span className="text-2xl font-bold text-xai-honolulu dark:text-xai-pacific">
                    {explanation.intercept.toFixed(4)}
                  </span>
                </div>
                <p className="text-sm">
                  The <strong>intercept</strong> represents the baseline score when no input text is present.
                  {explanation.intercept > 0.5 ? (
                    <> A high intercept ({explanation.intercept.toFixed(2)}) means the AI has strong default behavior
                    and is less dependent on your specific input.</>
                  ) : explanation.intercept > 0 ? (
                    <> A moderate intercept ({explanation.intercept.toFixed(2)}) indicates the AI balances between
                    default behavior and input-specific responses.</>
                  ) : (
                    <> A low or negative intercept ({explanation.intercept.toFixed(2)}) means the AI heavily depends
                    on your input to generate quality responses.</>
                  )}
                </p>
                <p className="text-xs text-gray-600 italic">
                  💡 Predicted score = Σ(unit scores) + intercept
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* BibTEX */}
          <div className="text-xs">
              <BibTEX/>
          </div>
      </div>
    </div>
  )
}
