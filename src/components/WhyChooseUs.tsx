import { Book, Code, Brain, MessageSquareText, Sliders, Globe } from "lucide-react"

const features = [
  {
    icon: <Brain className="h-10 w-10 text-xai-honolulu dark:text-xai-pacific" />,
    title: " Intelligent, Yet Understandable",
    description:
      "Get powerful language model responses with explanations anyone can grasp—no technical deep dive required.",
  },
  {
    icon: <MessageSquareText className="h-10 w-10 text-xai-honolulu dark:text-xai-pacific" />,
    title: "Fairness & Accountability",
    description:
      "By surfacing how inputs affect decisions, our AI helps identify and reduce unintended bias.",
  },
  {
    icon: <Sliders className="h-10 w-10 text-xai-honolulu dark:text-xai-pacific" />,
    title: "Customizable Insights",
    description:
      "Interactive charts and highlights make it easy to understand model behavior at a glance.",
  },
  {
    icon: <Globe className="h-10 w-10 text-xai-honolulu dark:text-xai-pacific" />,
    title: " True Transparency",
    description:
      "See why the AI responds the way it does, with clear token-weighted visualizations powered by LIME.",
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-white via-xai-lightcyan/30 to-xai-nonphoto2/50 dark:from-xai-federal dark:via-xai-marian dark:to-xai-honolulu">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 dark:text-xai-lightcyan">Why Us</h2>
          <p className="text-xai-marian dark:text-xai-nonphoto max-w-2xl mx-auto px-2 font-geist">
            Our explainable AI platform sets new standards for transparency, trust, and usability in artificial
            intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-xai-marian p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-xai-nonphoto dark:border-xai-honolulu hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className="bg-xai-lightcyan dark:bg-xai-honolulu p-2 sm:p-3 rounded-lg sm:rounded-xl">{feature.icon}</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-xai-federal dark:text-xai-lightcyan">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-xai-marian dark:text-xai-nonphoto font-geist">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-x-4">
          <div className="inline-flex items-center gap-2 bg-xai-nonphoto2 dark:bg-xai-honolulu px-4 py-2 rounded-full text-xai-marian dark:text-xai-lightcyan">
            <Code className="h-5 w-5" />
            <span className="font-medium">Access our code</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-xai-nonphoto2 dark:bg-xai-honolulu px-4 py-2 rounded-full text-xai-marian dark:text-xai-lightcyan">
            <Book className="h-5 w-5" />
            <span className="font-medium">Our research</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
