"use client";
import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import ExplanationPanel from "./ExplanationPanel";

interface ResponseType {
  AIResponse: string;
  rawPredictions: number[];
  LIMEOutput: string;
  predicted_confidence: number;
  local_fidelity: number;
}

export default function Chatbot() {
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (input: string): Promise<string> => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8080/lime-algorithm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const text = await res.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data: ResponseType = JSON.parse(text);

      // You can modify the returned format here if you want.
      setResponse(data);
      try {
        console.log("LIME Output:", data.LIMEOutput);
        console.log("Raw Predictions:", data.rawPredictions);
        console.log("AI Response:", data.AIResponse);
  
      } catch (error) {
        console.error("Error handling LIME Output:", error);
      }
      setLoading(false);
      return data.AIResponse;
    } catch (error) {
      console.error("Error submitting input:", error);
      setLoading(false);
      return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
    }
  };

  return (
    <>
    <div className="flex max-w-7xl mx-auto p-4 h-[100dvh] gap-4">
      {/* Chat takes up full space when no explanation, otherwise flex-1 */}
      <div className={response ? "flex-1" : "w-full"}>
        <ChatInterface onSubmit={handleSubmit} loading={loading} />
      </div>

      {/* Explanation panel only renders when there's data */}
      {response && (
        <div className="w-[500px] hidden md:block">
          <ExplanationPanel aiDetails={response} />
        </div>
      )}
    </div>
    </>
  );
}
