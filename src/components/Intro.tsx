import { Button } from "@/components/ui/button"
import About from "./About"

const Intro = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white snap-start">
        {/* Hero Section */}
        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 mt-20"> {/* Added mt-20 for more space at the top */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Bringing{" "}
              <span className="text-blue-500 relative">
                Clarity
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500/30 rounded-full" />
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mt-4"> {/* Added mt-4 for spacing between the lines */}
              to AI decisions
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
             Understand the &apos;why&apos; behind AI decisions. 
             Our system ensures clarity and transparency by explaining every AI decision in a way you can trust.
            </p>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
          </div>
        </main>
      </div>

      {/* About Section - Preserved from original */}
      <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white snap-start">
        <About />
      </div>
    </div>
  )
}

export default Intro
