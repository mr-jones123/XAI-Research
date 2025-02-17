import React from "react";
import { ProfileCard } from "@/components/profile";

const Developers = [
  { name: "Xynil Jhed Lacap", role: "Project Manager", image: "/picture.png" },
  {
    name: "Janna Andrea Justiniano",
    role: "Fullstack/UI/UX",
    image: "/picture.png",
  },
  { name: "John Aiverson Abong", role: "Docs/UI", image: "/picture.png" },
  {
    name: "Raphael Andre Mercado",
    role: "Frontend/Backend",
    image: "/picture.png",
  },
];

const About = () => {
  return (
    <div className="p-10">
      <h1 className="mb-8 text-2x1 sm:text-3x1 md:text-4x1 lg:text-5x1 font-bold">
        Developers
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
  );
};

export default About;
