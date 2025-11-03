import { Info, CheckCircle, BarChart2 } from "lucide-react"

const ExplainabilitySection = () => {  return (
    <section className="pt-10 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 bg-gradient-to-br from-xai-lightcyan/50 via-xai-nonphoto2/30 to-white dark:from-xai-marian/50 dark:via-xai-honolulu/30 dark:to-xai-federal rounded-2xl sm:rounded-3xl my-6 sm:my-8 md:my-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center overflow-hidden">
          {/* Left side - Phone mockup */}
          <div className="relative mx-auto max-w-xs sm:max-w-sm w-full px-4 sm:px-0">
            <div className="bg-xai-federal dark:bg-xai-nonphoto rounded-[30px] sm:rounded-[40px] p-1.5 sm:p-2 shadow-xl border-2 sm:border-4 border-xai-marian dark:border-xai-vivid">
              <div className="bg-white dark:bg-xai-federal rounded-[24px] sm:rounded-[32px] overflow-hidden h-[400px] sm:h-[480px] md:h-[580px] relative">
                {/* Phone status bar */}
                <div className="bg-xai-nonphoto2 dark:bg-xai-marian p-2 flex justify-between items-center">
                  <div className="text-xs font-medium dark:text-xai-lightcyan">9:41</div>
                  <div className="w-32 h-5 bg-xai-federal dark:bg-xai-lightcyan rounded-full mx-auto absolute left-0 right-0"></div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-xai-bluegreen dark:bg-xai-vivid"></div>
                    <div className="w-4 h-4 rounded-full bg-xai-bluegreen dark:bg-xai-vivid"></div>
                  </div>
                </div>

                {/* Chat header */}
                <div className="p-3 border-b border-xai-nonphoto2 dark:border-xai-honolulu flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-xai-honolulu dark:bg-xai-pacific flex items-center justify-center text-white">
                    <Info size={16} />
                  </div>
                  <div>
                    <div className="font-medium dark:text-xai-nonphoto">XeeAI Assistant</div>
                    <div className="text-xs text-xai-marian dark:text-xai-vivid">Explainable AI</div>
                  </div>
                </div>

                {/* Chat content */}
                <div className="p-3 h-[450px] overflow-y-auto bg-xai-lightcyan/20 dark:bg-xai-federal">
                  {/* Step 1: User Input */}
                  <div className="flex justify-end mb-4">
                    <div className="bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                      <p className="text-sm dark:text-white">How do neural networks make decisions?</p>
                    </div>
                  </div>

                  {/* Step 2: AI Output */}
                  <div className="flex mb-4">
                    <div className="bg-xai-honolulu dark:bg-xai-pacific text-white rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="text-sm">
                        Neural networks make decisions through a process of weighted connections between artificial
                        neurons. They learn by adjusting these weights during training, allowing them to recognize
                        patterns in data. When presented with new inputs, they process this information through multiple
                        layers, with each neuron applying an activation function to determine its output.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Token Weight Visualization */}
                  <div className="bg-white dark:bg-xai-marian border border-xai-nonphoto dark:border-xai-honolulu rounded-xl p-4 shadow-sm mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 size={18} className="text-xai-honolulu dark:text-xai-pacific" />
                      <p className="text-sm font-medium text-xai-marian dark:text-xai-vivid">Token Weight Analysis</p>
                    </div>

                    <p className="text-xs text-xai-marian dark:text-xai-nonphoto mb-3">
                      Token weights showing influence of each word on the response:
                    </p>

                    {/* Literal bar graph with token weights */}
                    <div className="bg-xai-lightcyan dark:bg-xai-federal rounded-lg p-3">
                      {/* The actual bar graph */}
                      <div className="h-[140px] flex items-end justify-between gap-1 mb-2 pt-3 border-b border-xai-nonphoto dark:border-xai-honolulu relative">
                        {/* Y-axis labels */}
                        <div className="absolute -left-2 top-0 bottom-0 w-8 flex flex-col justify-between text-[9px] text-xai-marian dark:text-xai-vivid">
                          <span>2.0</span>
                          <span>1.5</span>
                          <span>1.0</span>
                          <span>0.5</span>
                          <span>0.0</span>
                        </div>

                        {/* Horizontal grid lines */}
                        <div className="absolute left-6 right-0 top-0 bottom-0 flex flex-col justify-between">
                          <div className="border-t border-dashed border-xai-nonphoto dark:border-xai-honolulu w-full h-0"></div>
                          <div className="border-t border-dashed border-xai-nonphoto dark:border-xai-honolulu w-full h-0"></div>
                          <div className="border-t border-dashed border-xai-nonphoto dark:border-xai-honolulu w-full h-0"></div>
                          <div className="border-t border-dashed border-xai-nonphoto dark:border-xai-honolulu w-full h-0"></div>
                          <div className="border-t border-dashed border-xai-nonphoto dark:border-xai-honolulu w-full h-0"></div>
                        </div>

                        {/* Bars */}
                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-vivid dark:bg-xai-bluegreen w-6 rounded-t-sm" style={{ height: "30px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">how</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">0.43</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-vivid dark:bg-xai-bluegreen w-6 rounded-t-sm" style={{ height: "20px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">do</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">0.28</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-marian dark:bg-xai-pacific w-6 rounded-t-sm" style={{ height: "120px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">neural</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">1.79</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-marian dark:bg-xai-pacific w-6 rounded-t-sm" style={{ height: "115px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">networks</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">1.68</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-honolulu dark:bg-xai-vivid w-6 rounded-t-sm" style={{ height: "70px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">make</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">0.97</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-marian dark:bg-xai-pacific w-6 rounded-t-sm" style={{ height: "110px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">decisions</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">1.62</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center">
                          <div className="bg-xai-nonphoto dark:bg-xai-bluegreen w-6 rounded-t-sm" style={{ height: "10px" }}></div>
                          <span className="text-[9px] mt-1 text-xai-marian dark:text-xai-nonphoto">?</span>
                          <span className="text-[8px] text-xai-marian dark:text-xai-vivid font-medium">0.12</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-xai-marian dark:bg-xai-pacific rounded-sm"></div>
                          <span className="text-[9px] text-xai-marian dark:text-xai-nonphoto">High influence</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-xai-vivid dark:bg-xai-bluegreen rounded-sm"></div>
                          <span className="text-[9px] text-xai-marian dark:text-xai-nonphoto">Low influence</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-xai-marian dark:text-xai-nonphoto mt-3">
                      The tokens &quot;neural&quot; (1.79), &quot;networks&quot; (1.68), and &quot;decisions&quot; (1.62) have the highest weights,
                      indicating they most strongly influenced the model&apos;s response.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature cards - Hidden on mobile/tablet, shown on large screens */}
            <div className="hidden xl:block absolute -right-24 top-20 bg-white dark:bg-xai-marian rounded-xl p-4 shadow-md border border-xai-nonphoto dark:border-xai-honolulu w-48">
              <div className="w-8 h-8 rounded-full bg-xai-nonphoto2 dark:bg-xai-honolulu flex items-center justify-center text-xai-honolulu dark:text-xai-lightcyan mb-2">
                <CheckCircle size={16} />
              </div>
              <h4 className="font-medium text-sm dark:text-xai-nonphoto">Token Analysis</h4>
              <p className="text-xs text-xai-marian dark:text-xai-vivid mt-1">
                See which parts of your input influenced the AI&apos;s response most.
              </p>
            </div>

            <div className="hidden xl:block absolute -right-16 top-64 bg-white dark:bg-xai-marian rounded-xl p-4 shadow-md border border-xai-nonphoto dark:border-xai-honolulu w-48">
              <div className="w-8 h-8 rounded-full bg-xai-nonphoto2 dark:bg-xai-honolulu flex items-center justify-center text-xai-honolulu dark:text-xai-lightcyan mb-2">
                <CheckCircle size={16} />
              </div>
              <h4 className="font-medium text-sm dark:text-xai-nonphoto">LIME Integration</h4>
              <p className="text-xs text-xai-marian dark:text-xai-vivid mt-1">
                Visualize how the model interprets your queries with local explanations.
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="px-4 lg:px-0">
            <div className="inline-block px-4 py-1 bg-xai-nonphoto2 dark:bg-xai-honolulu rounded-full text-xai-marian dark:text-xai-lightcyan text-sm font-medium mb-4">
              Transparency & Trust
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 dark:text-xai-lightcyan">Why Explainability Matters</h2>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-xai-marian dark:text-xai-nonphoto font-geist">
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

              <div className="bg-xai-lightcyan dark:bg-xai-marian border-l-4 border-xai-honolulu dark:border-xai-pacific p-4 rounded-r-lg my-6">
                <p className="italic text-xai-marian dark:text-xai-nonphoto">
                  &quot;Explanations are necessary for trust. Without them, users are left to guess or blindly follow AI
                  decisions.&quot;
                </p>
                <p className="text-sm text-xai-marian/70 dark:text-xai-vivid mt-2">
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
