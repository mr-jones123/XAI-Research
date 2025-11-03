"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Brain, Zap, Target, CheckCircle } from "lucide-react"

interface LimeStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  duration: number
}

const sampleText =
  "The movie was absolutely fantastic with great acting and stunning visuals that kept me engaged throughout."

const limeSteps: LimeStep[] = [
  {
    id: "perturb",
    title: "Perturbing Text",
    description: "Creating variations by masking words",
    icon: <Zap className="w-5 h-5" />,
    duration: 3000,
  },
  {
    id: "predict",
    title: "Getting Predictions",
    description: "Running model on perturbed samples",
    icon: <Brain className="w-5 h-5" />,
    duration: 2500,
  },
  {
    id: "weight",
    title: "Calculating Weights",
    description: "Learning local interpretable model",
    icon: <Target className="w-5 h-5" />,
    duration: 2000,
  },
  {
    id: "explain",
    title: "Generating Explanation",
    description: "Extracting feature importance",
    icon: <CheckCircle className="w-5 h-5" />,
    duration: 1500,
  },
]

export default function Loading() {
  const [currentStep, setCurrentStep] = useState(0)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const words = sampleText.split(" ")

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })
    timelineRef.current = tl

    // perturb text
    tl.call(() => setCurrentStep(0))
      .to(progressRef.current, { width: "25%", duration: 0.5 })
      .call(() => {
        // word masking
        wordsRef.current.forEach((word, index) => {
          gsap.to(word, {
            opacity: Math.random() > 0.3 ? 1 : 0.3,
            backgroundColor: Math.random() > 0.7 ? "#fef3c7" : "transparent",
            duration: 0.3,
            delay: index * 0.1,
            repeat: 5,
            yoyo: true,
          })
        })
      })
      .to({}, { duration: 3 })

    // predict
    tl.call(() => setCurrentStep(1))
      .to(progressRef.current, { width: "50%", duration: 0.5 })
      .call(() => {
        wordsRef.current.forEach((word) => {
          gsap.set(word, { opacity: 1, backgroundColor: "transparent" })
        })

        for (let i = 0; i < 3; i++) {
          gsap.to(textRef.current, {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            duration: 0.5,
            delay: i * 0.8,
            yoyo: true,
            repeat: 1,
          })
        }
      })
      .to({}, { duration: 2.5 })

    // calculate weights
    tl.call(() => setCurrentStep(2))
      .to(progressRef.current, { width: "75%", duration: 0.5 })
      .call(() => {
        const importantWords = [0, 3, 4, 7, 9, 12] 
        wordsRef.current.forEach((word, index) => {
          if (importantWords.includes(index)) {
            gsap.to(word, {
              color: "#dc2626",
              fontWeight: "bold",
              scale: 1.1,
              duration: 0.5,
              delay: index * 0.1,
            })
          } else {
            gsap.to(word, {
              color: "#6b7280",
              duration: 0.5,
              delay: index * 0.1,
            })
          }
        })
      })
      .to({}, { duration: 2 })

    // generate explanations
    tl.call(() => setCurrentStep(3))
      .to(progressRef.current, { width: "100%", duration: 0.5 })
      .call(() => {
        gsap.to(textRef.current, {
          borderColor: "#10b981",
          borderWidth: "2px",
          duration: 0.5,
        })
      })
      .to({}, { duration: 1.5 })

    tl.call(() => {
      setCurrentStep(0)
      gsap.set(progressRef.current, { width: "0%" })
      gsap.set(textRef.current, {
        boxShadow: "none",
        borderColor: "#e5e7eb",
        borderWidth: "1px",
      })
      wordsRef.current.forEach((word) => {
        gsap.set(word, {
          opacity: 1,
          backgroundColor: "transparent",
          color: "#374151",
          fontWeight: "normal",
          scale: 1,
        })
      })
    })

    return () => {
      timelineRef.current?.kill()
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4 bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="w-8 h-8 text-xai-honolulu dark:text-xai-pacific" />
            <h1 className="text-3xl font-bold text-gray-900">LIME Analysis</h1>
          </div>
          <p className="text-gray-600 text-lg font-geist">Local Interpretable Model-agnostic Explanations. See how it works!</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analyzing Text:</h3>
          <div ref={textRef} className="text-lg leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50">
            {words.map((word, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) wordsRef.current[index] = el
                }}
                className="inline-block mr-2 px-1 rounded transition-all duration-300 font-geist"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Processing Steps</h3>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {limeSteps.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              ref={progressRef}
              className="bg-gradient-to-r from-xai-honolulu to-xai-pacific h-3 rounded-full transition-all duration-500"
              style={{ width: "0%" }}
            />
          </div>

          {/* Current Step Info */}
          <div className="flex items-center space-x-4 p-4 bg-xai-lightcyan dark:bg-xai-marian rounded-lg">
            <div className="flex-shrink-0 p-2 bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-full">{limeSteps[currentStep]?.icon}</div>
            <div>
              <h4 className="font-semibold text-xai-marian dark:text-xai-lightcyan">{limeSteps[currentStep]?.title}</h4>
              <p className="text-xai-honolulu dark:text-xai-nonphoto text-sm">{limeSteps[currentStep]?.description}</p>
            </div>
          </div>
        </div>

        {/* Steps Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {limeSteps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                index === currentStep
                  ? "border-xai-pacific bg-xai-lightcyan dark:border-xai-vivid dark:bg-xai-marian shadow-lg"
                  : index < currentStep
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <div
                  className={`p-1 rounded-full ${
                    index === currentStep
                      ? "bg-xai-nonphoto2 text-xai-honolulu dark:bg-xai-honolulu dark:text-xai-lightcyan"
                      : index < currentStep
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
              <p className="text-xs text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-xai-honolulu dark:border-xai-pacific"></div>
            <span className="text-sm">Processing your request...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
