import type React from "react";
import { MessageSquare, Bot, BarChart2 } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="border-t border-gray-200 my-6 sm:my-10 md:my-16 lg:my-20"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 px-4">
          How it works?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-4 font-geist">
          See how our AI works—get answers, and understand the &lsquo;why&apos;
          behind them.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8 px-4 sm:px-6 lg:px-8">
        <article className="flex flex-col items-center">
          <div className="bg-xai-lightcyan dark:bg-xai-marian rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 w-full max-w-sm min-h-56 sm:min-h-64 relative overflow-hidden">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-full p-1.5 sm:p-2">
              <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
                1
              </div>
            </div>
            <div className="bg-white dark:bg-xai-federal rounded-xl shadow-sm p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-xai-honolulu dark:text-xai-pacific" />
                <p className="text-xs sm:text-sm font-medium dark:text-xai-nonphoto">Chat with XeeAI</p>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="bg-xai-nonphoto2 dark:bg-xai-marian h-3 sm:h-4 rounded-full w-full"
                  />
                ))}
              </div>
            </div>
            <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-xl p-3 sm:p-4 ml-auto mr-2 sm:mr-4 max-w-[85%] sm:max-w-[80%]">
              <p className="text-xs sm:text-sm">Summarize this text: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.
                The best performing models also connect the encoder and decoder through an attention mechanism.</p>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 bg-white dark:bg-xai-federal rounded-full p-2 pr-2 sm:pr-3 border border-xai-nonphoto2 dark:border-xai-honolulu">
              <div className="bg-xai-nonphoto2 dark:bg-xai-honolulu p-1.5 sm:p-2 rounded-full">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-xai-honolulu dark:text-xai-pacific" />
              </div>
              <div className="bg-xai-nonphoto2 dark:bg-xai-marian h-3 sm:h-4 rounded-full w-full" />
              <div className="bg-xai-honolulu dark:bg-xai-pacific rounded-full p-0.5 sm:p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 sm:h-4 sm:w-4 text-white"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 px-2">User Input</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center font-geist px-4">
            Type your input. Our goal isn&apos;t just to answer it, but to
            help you understand why the AI responded the way it did.
          </p>
        </article>

        <article className="flex flex-col items-center">
          <div className="bg-xai-lightcyan dark:bg-xai-marian rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 w-full max-w-sm min-h-56 sm:min-h-64 relative overflow-hidden">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-full p-1.5 sm:p-2">
              <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
                2
              </div>
            </div>
            <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-xl p-3 sm:p-4 mr-auto ml-2 sm:ml-4 max-w-[85%] sm:max-w-[80%] mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm">Summarize this text: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder.
                The best performing models also connect the encoder and decoder through an attention mechanism.</p>
            </div>
            <div className="bg-white dark:bg-xai-federal rounded-xl shadow-sm p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-xai-honolulu dark:text-xai-pacific" />
                <p className="text-xs sm:text-sm font-medium dark:text-xai-nonphoto">XeeAI</p>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian h-2.5 sm:h-3 rounded-full w-full" />
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian h-2.5 sm:h-3 rounded-full w-[90%]" />
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian h-2.5 sm:h-3 rounded-full w-[80%]" />
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian h-2.5 sm:h-3 rounded-full w-[95%]" />
              </div>
              <div className="mt-2 sm:mt-3 flex justify-end">
                <div className="bg-xai-nonphoto2 dark:bg-xai-honolulu text-xai-honolulu dark:text-xai-lightcyan text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  LIME Output →
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 px-2">AI Response</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center font-geist px-4">
            The AI will responds to your input whilst providing an explanation of its decision.
          </p>
        </article>

        <article className="flex flex-col items-center">
          <div className="bg-xai-lightcyan dark:bg-xai-marian rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 w-full max-w-sm min-h-56 sm:min-h-64 relative overflow-hidden">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-full p-1.5 sm:p-2">
              <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold">
                3
              </div>
            </div>
            <div className="bg-white dark:bg-xai-federal rounded-xl shadow-sm p-3 sm:p-4 h-full">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BarChart2 className="h-4 w-4 sm:h-5 sm:w-5 text-xai-honolulu dark:text-xai-pacific" />
                <p className="text-xs sm:text-sm font-medium dark:text-xai-nonphoto">LIME Explanation</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2">
                  <div className="h-2 w-[70%] bg-xai-honolulu dark:bg-xai-pacific rounded-full mb-1" />
                  <div className="h-2 w-[40%] bg-xai-bluegreen dark:bg-xai-vivid rounded-full mb-1" />
                  <div className="h-2 w-[90%] bg-xai-marian dark:bg-xai-honolulu rounded-full" />
                </div>
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2 flex items-end justify-around">
                  <div className="w-3 h-10 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                  <div className="w-3 h-6 bg-xai-honolulu dark:bg-xai-pacific rounded-t-sm" />
                  <div className="w-3 h-14 bg-xai-marian dark:bg-xai-honolulu rounded-t-sm" />
                  <div className="w-3 h-8 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                </div>
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2 flex items-end justify-around">
                  <div className="w-3 h-10 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                  <div className="w-3 h-6 bg-xai-honolulu dark:bg-xai-pacific rounded-t-sm" />
                  <div className="w-3 h-14 bg-xai-marian dark:bg-xai-honolulu rounded-t-sm" />
                  <div className="w-3 h-8 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                </div>
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2">
                  <div className="h-2 w-[70%] bg-xai-honolulu dark:bg-xai-pacific rounded-full mb-1" />
                  <div className="h-2 w-[40%] bg-xai-bluegreen dark:bg-xai-vivid rounded-full mb-1" />
                  <div className="h-2 w-[90%] bg-xai-marian dark:bg-xai-honolulu rounded-full" />
                </div>

                <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2 flex items-end justify-around">
                  <div className="w-3 h-10 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                  <div className="w-3 h-6 bg-xai-honolulu dark:bg-xai-pacific rounded-t-sm" />
                  <div className="w-3 h-14 bg-xai-marian dark:bg-xai-honolulu rounded-t-sm" />
                  <div className="w-3 h-8 bg-xai-bluegreen dark:bg-xai-vivid rounded-t-sm" />
                </div>

              </div>
              <div className="bg-xai-nonphoto2 dark:bg-xai-marian rounded-lg p-2 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 sm:border-4 border-xai-nonphoto dark:border-xai-honolulu flex items-center justify-center">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-xai-vivid dark:border-xai-bluegreen flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-xai-honolulu dark:bg-xai-pacific"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 px-2">Visual Explanations</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center font-geist px-4">
            A bar graph where you can see the most influential words that you used in your input.
          </p>
        </article>
      </div>
    </section>
  );
};

export default HowItWorks;
