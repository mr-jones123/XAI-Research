import { Info, CheckCircle, BarChart2 } from "lucide-react"

const ExplainabilitySection = () => {  return (
    <section className="pt-10 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 bg-gradient-to-br from-blue-50/50 to-white rounded-2xl sm:rounded-3xl my-6 sm:my-8 md:my-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Phone mockup */}
          <div className="relative mx-auto max-w-xs sm:max-w-sm">
            <div className="bg-gray-900 rounded-[30px] sm:rounded-[40px] p-1.5 sm:p-2 shadow-xl border-2 sm:border-4 border-gray-800">
              <div className="bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden h-[400px] sm:h-[480px] md:h-[580px] relative">
                {/* Phone status bar */}
                <div className="bg-gray-100 p-2 flex justify-between items-center">
                  <div className="text-xs font-medium">9:41</div>
                  <div className="w-32 h-5 bg-black rounded-full mx-auto absolute left-0 right-0"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  </div>
                </div>

                {/* Chat header */}
                <div className="p-3 border-b flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Info size={16} />
                  </div>
                  <div>
                    <div className="font-medium">XeeAI Assistant</div>
                    <div className="text-xs text-gray-500">Explainable AI</div>
                  </div>
                </div>

                {/* Chat content */}
                <div className="p-3 h-[450px] overflow-y-auto bg-gray-50">
                  {/* Step 1: User Input */}
                  <div className="flex justify-end mb-4">
                    <div className="bg-gray-200 rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                      <p className="text-sm">How do neural networks make decisions?</p>
                    </div>
                  </div>

                  {/* Step 2: AI Output */}
                  <div className="flex mb-4">
                    <div className="bg-blue-500 text-white rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="text-sm">
                        Neural networks make decisions through a process of weighted connections between artificial
                        neurons. They learn by adjusting these weights during training, allowing them to recognize
                        patterns in data. When presented with new inputs, they process this information through multiple
                        layers, with each neuron applying an activation function to determine its output.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Token Weight Visualization */}
                  <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 size={18} className="text-blue-500" />
                      <p className="text-sm font-medium text-blue-700">Token Weight Analysis</p>
                    </div>

                    <p className="text-xs text-gray-600 mb-3">
                      Token weights showing influence of each word on the response:
                    </p>

                    {/* Literal bar graph with token weights */}
                    <div className="bg-blue-50 rounded-lg p-3">
                      {/* The actual bar graph */}
                      <div className="h-[140px] flex items-end justify-between gap-1 mb-2 pt-3 border-b border-gray-300 relative">
                        {/* Y-axis labels */}
                        <div className="absolute -left-2 top-0 bottom-0 w-8 flex flex-col justify-between text-[9px] text-gray-500">
                          <span>2.0</span>
                          <span>1.5</span>
                          <span>1.0</span>
                          <span>0.5</span>
                          <span>0.0</span>
                        </div>

                        {/* Horizontal grid lines */}
                        <div className="absolute left-6 right-0 top-0 bottom-0 flex flex-col justify-between">
                          <div className="border-t border-dashed border-gray-300 w-full h-0"></div>
                          <div className="border-t border-dashed border-gray-300 w-full h-0"></div>
                          <div className="border-t border-dashed border-gray-300 w-full h-0"></div>
                          <div className="border-t border-dashed border-gray-300 w-full h-0"></div>
                          <div className="border-t border-dashed border-gray-300 w-full h-0"></div>
                        </div>

                        {/* Bars */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-300 w-6 rounded-t-sm" style={{ height: "30px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">how</span>
                          <span className="text-[8px] text-blue-700 font-medium">0.43</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-300 w-6 rounded-t-sm" style={{ height: "20px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">do</span>
                          <span className="text-[8px] text-blue-700 font-medium">0.28</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-600 w-6 rounded-t-sm" style={{ height: "120px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">neural</span>
                          <span className="text-[8px] text-blue-700 font-medium">1.79</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-600 w-6 rounded-t-sm" style={{ height: "115px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">networks</span>
                          <span className="text-[8px] text-blue-700 font-medium">1.68</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-500 w-6 rounded-t-sm" style={{ height: "70px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">make</span>
                          <span className="text-[8px] text-blue-700 font-medium">0.97</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-600 w-6 rounded-t-sm" style={{ height: "110px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">decisions</span>
                          <span className="text-[8px] text-blue-700 font-medium">1.62</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-blue-200 w-6 rounded-t-sm" style={{ height: "10px" }}></div>
                          <span className="text-[9px] mt-1 text-gray-600">?</span>
                          <span className="text-[8px] text-blue-700 font-medium">0.12</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                          <span className="text-[9px] text-gray-600">High influence</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
                          <span className="text-[9px] text-gray-600">Low influence</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mt-3">
                      The tokens &quot;neural&quot; (1.79), &quot;networks&quot; (1.68), and &quot;decisions&quot; (1.62) have the highest weights,
                      indicating they most strongly influenced the model&apos;s response.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="absolute -right-24 top-20 bg-white rounded-xl p-4 shadow-md border border-blue-100 w-48">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
                <CheckCircle size={16} />
              </div>
              <h4 className="font-medium text-sm">Token Analysis</h4>
              <p className="text-xs text-gray-500 mt-1">
                See which parts of your input influenced the AI&apos;s response most.
              </p>
            </div>

            <div className="absolute -right-16 top-64 bg-white rounded-xl p-4 shadow-md border border-blue-100 w-48">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-2">
                <CheckCircle size={16} />
              </div>
              <h4 className="font-medium text-sm">LIME Integration</h4>
              <p className="text-xs text-gray-500 mt-1">
                Visualize how the model interprets your queries with local explanations.
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="inline-block px-4 py-1 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
              Transparency & Trust
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Explainability Matters</h2>

            <div className="space-y-4 text-gray-600">
              <p>
                Modern AI systems—especially large language models—can generate highly convincing outputs, yet often
                operate as black boxes, leaving users unsure how or why certain answers are produced. This lack of
                transparency raises serious concerns around trust, accountability, and fairness.
              </p>

              <p>
                Explainable AI (XAI) addresses this challenge by making model decisions understandable to humans. By
                highlighting which parts of an input most influenced the output, users can better assess the
                reliability, bias, and rationale behind AI-generated responses.
              </p>

              <p>
                Our project integrates XAI techniques like LIME (Local Interpretable Model-agnostic Explanations) and
                token-weight analysis to make the inner workings of our chatbot transparent and interpretable. We
                believe this is essential for building ethical, responsible AI systems—especially in contexts like
                education, law, healthcare, and research.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
                <p className="italic text-gray-700">
                  &quot;Explanations are necessary for trust. Without them, users are left to guess or blindly follow AI
                  decisions.&quot;
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  — Ribeiro et al., &quot;Why Should I Trust You?&quot;: Explaining the Predictions of Any Classifier
                  (2016)
                </p>
              </div>

              <p>
                By prioritizing explainability, we move toward AI systems that are not just powerful, but also
                accountable, fair, and human-aligned.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExplainabilitySection
