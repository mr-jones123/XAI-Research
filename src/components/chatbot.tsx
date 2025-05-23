"use client"
import { useState } from "react"
import ChatInterface from "@/components/ChatInterface"
import ExplanationPanel from "./ExplanationPanel"

type LimeDataPoint = {
  feature: string
  weight: number
}

type ChatbotProps = {
  chatId: string;
};


interface ResponseType {
  aiDetails: {
    AIResponse: string
    LIMEOutput: Array<LimeDataPoint>
    localFidelity?: number | null
    rawPredictions?: number[]
  } | null
}

export default function Chatbot({ chatId }: ChatbotProps) {
  const [response, setResponse] = useState<ResponseType | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentQuery, setCurrentQuery] = useState<string>("")

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true)
    setCurrentQuery(input)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FLASK_ENDPOINT as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      })

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }

      const text = await res.text()

      if (!text) {
        throw new Error("Empty response from server")
      }

      try {
        const data = JSON.parse(text)

        // Transform the data from backend format to match your ResponseType interface
        const formattedResponse: ResponseType = {
          aiDetails: {
            AIResponse: data.AIResponse || "No response provided",
            LIMEOutput: data.LIMEOutput || [],
            localFidelity: data.localFidelity || null,
            rawPredictions: data.rawPredictions || []
          },
        }

        setResponse(formattedResponse)

        if (data.LIMEOutput) {
          console.log("Parsed LIME Output:", data.LIMEOutput)
        } else {
          console.log("No LIME output available in response")
        }

        return `AI Response: ${data.AIResponse || "No response provided"}`
      } catch (error) {
        console.error("Error parsing response:", error)
        return "Sorry, something went wrong."
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      return "Sorry, something went wrong."
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex max-w-7xl mx-auto p-4 h-[100dvh] gap-4">
      <div className={response ? "flex-1" : "w-full"}>
        <ChatInterface onSubmit={handleSubmit} loading={loading} />
      </div>

      {response?.aiDetails && (
        <div className="w-[350px] hidden md:block">
          <ExplanationPanel aiDetails={response.aiDetails} userQuery={currentQuery} />
        </div>
      )}
    </div>
  )
}