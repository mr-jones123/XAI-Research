import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import About from "./About";
import { Button } from "@/components/ui/button";

const Intro = () => {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
      <div className="h-screen flex flex-col items-center snap-start">
        <h1 className="text-lg pb-5 pt-4">Welcome to XAI</h1>
        <p className="max-w-prose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          accumsan turpis molestie, lobortis metus sed, molestie lorem. Sed
          bibendum justo arcu, a tristique orci tempor non. Duis et viverra
          nisl, ac tristique dui.
        </p>
        <img
          className="w-60 h-60 mt-5 rounded-full bg-black transition-transform duration-300 hover:scale-90"
          src="sample-logo.png"
          alt="logo"
        />
        <Button className="mt-4 px-6 h-12">Get Started</Button>
      </div>

      <div className="h-screen flex flex-col items-center justify-center bg-gray-800 text-white snap-start">
        <About />
      </div>
    </div>
  );
};

export default Intro;
