import type React from "react";
import { MessageSquare, Bot, BarChart2 } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="border-t border-gray-200 my-10 sm:my-16 md:my-20"></div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
          How it works?
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto px-4">
          See how our AI works—get answers, and understand the &lsquo;why&apos;
          behind them.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
        <article className="flex flex-col items-center">
          <div className="bg-blue-50 rounded-3xl p-6 mb-6 w-full max-w-sm min-h-64 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-blue-100 rounded-full p-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <p className="text-sm font-medium">Chat with XeeAI</p>
              </div>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-100 h-4 rounded-full w-full"
                  />
                ))}
              </div>
            </div>
            <div className="bg-blue-500 text-white rounded-xl p-4 ml-auto mr-4 max-w-[80%]">
              <p className="text-sm">How do neural networks make decisions?</p>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-white rounded-full p-2 pr-3 border border-gray-200">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </div>
              <div className="bg-gray-100 h-4 rounded-full w-full" />
              <div className="bg-blue-500 rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-white"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">User Input</h3>
          <p className="text-gray-500 text-center">
            Type your question. Our goal isn&apos;t just to answer it, but to
            help you understand why the AI responded the way it did.
          </p>
        </article>

        <article className="flex flex-col items-center">
          <div className="bg-blue-50 rounded-3xl p-6 mb-6 w-full max-w-sm min-h-64 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-blue-100 rounded-full p-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
            </div>
            <div className="bg-blue-500 text-white rounded-xl p-4 mr-auto ml-4 max-w-[80%] mb-4">
              <p className="text-sm">How do neural networks make decisions?</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="h-5 w-5 text-blue-500" />
                <p className="text-sm font-medium">XeeAI</p>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-100 h-3 rounded-full w-full" />
                <div className="bg-gray-100 h-3 rounded-full w-[90%]" />
                <div className="bg-gray-100 h-3 rounded-full w-[80%]" />
                <div className="bg-gray-100 h-3 rounded-full w-[95%]" />
                <div className="bg-gray-100 h-3 rounded-full w-[60%]" />
              </div>
              <div className="mt-3 flex justify-end">
                <div className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-md">
                  See explanation →
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">AI Response</h3>
          <p className="text-gray-500 text-center">
            The AI shows the thought process behind its response. You&apos;ll
            see what concepts or sources influenced the answer, so you can
            understand how and why it arrived at that conclusion
          </p>
        </article>

        <article className="flex flex-col items-center">
          <div className="bg-blue-50 rounded-3xl p-6 mb-6 w-full max-w-sm min-h-64 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-blue-100 rounded-full p-2">
              <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="h-5 w-5 text-blue-500" />
                <p className="text-sm font-medium">Explanation</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <div className="h-2 w-[70%] bg-blue-500 rounded-full mb-1" />
                  <div className="h-2 w-[40%] bg-blue-400 rounded-full mb-1" />
                  <div className="h-2 w-[90%] bg-blue-600 rounded-full" />
                </div>
                <div className="bg-blue-100 rounded-lg p-2 flex items-end justify-around">
                  <div className="w-3 h-10 bg-blue-400 rounded-t-sm" />
                  <div className="w-3 h-6 bg-blue-500 rounded-t-sm" />
                  <div className="w-3 h-14 bg-blue-600 rounded-t-sm" />
                  <div className="w-3 h-8 bg-blue-400 rounded-t-sm" />
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-blue-200 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-blue-300 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Visual Explanations</h3>
          <p className="text-gray-500 text-center">
            Interactive visualizations that break down how different pieces of
            information affected the AI’s response.
          </p>
        </article>
      </div>
    </section>
  );
};

export default HowItWorks;
