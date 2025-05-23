"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const facts = [
  // LIME Algorithm Facts
  "LIME (Local Interpretable Model-agnostic Explanations) helps explain which parts of a news caption influence the AI's decision.",
  "LIME works by creating simplified local models that approximate how the AI makes decisions about specific news items.",
  "LIME highlights words and phrases that are most indicative of fake or real news in the analyzed text.",
  "LIME was developed by researchers Marco Tulio Ribeiro, Sameer Singh, and Carlos Guestrin in 2016.",
  "LIME helps build trust in AI by making complex fake news detection models more transparent and understandable.",

  // Fake News in the Philippines Facts
  "A 2018 study found that 88% of Filipinos have been exposed to fake news on social media.",
  "The Philippines has one of the highest social media usage rates globally, making it vulnerable to misinformation.",
  "During elections in the Philippines, fake news spreads rapidly through Facebook and messaging apps.",
  "Fact-checking organizations like Vera Files and Rappler help combat fake news in the Philippines.",
  "The Philippines passed the 'Bayanihan to Heal as One Act' in 2020, which included provisions against spreading false information.",
  "Studies show that fake news in the Philippines often spreads through family WhatsApp and Facebook Messenger groups.",
  "Media literacy programs are being implemented in Philippine schools to help students identify fake news.",
  "During the COVID-19 pandemic, health-related misinformation was particularly prevalent in the Philippines.",
  "Research shows that sensational headlines are more likely to be shared, which contributes to fake news spread in the Philippines.",
  "A study by the University of the Philippines found that political fake news peaks during election periods.",
]

export default function LoadingFacts() {
  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % facts.length)
    }, 5000) // Change fact every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4 w-full max-w-xl mx-auto my-8">
      <div className="flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mr-2" />
        <h3 className="text-xl font-medium">Processing your request...</h3>
      </div>

      <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Did you know?</h4>
              <p className="text-gray-700">{facts[currentFact]}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-1">
        {facts.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentFact ? "w-6 bg-primary" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
