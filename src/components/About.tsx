import React from "react";
import { ProfileCard } from "@/components/profile";

const Developers = [
  {
    name: "Xynil Jhed Lacap",
    role: "Project Manager",
    image: "/xynil-pic.jpg",
  },
  {
    name: "Janna Andrea Justiniano",
    role: "Fullstack/UI/UX",
    image: "/janna-pic.jpg",
  },
  {
    name: "John Aiverson Abong",
    role: "Docs/UI/QA",
    image: "/aiverson-pic.jpg",
  },
  {
    name: "Raphael Andre Mercado",
    role: "Frontend/Backend",
    image: "/mercado-pic.jpg",
  },
];

const About = () => {
  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center font-montserrat text-black drop-shadow-lg">
          Meet the Team
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Developers.map((developer, index) => (
            <ProfileCard
              key={index}
              name={developer.name}
              role={developer.role}
              image={developer.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
