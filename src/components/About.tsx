"use client";
import React, { useState } from "react";
import { ProfileCard } from "@/components/profile";
import ProfileDialog from "./dialog";

const Developers = [
  {
    name: "Xynil Jhed Lacap",
    role: "Full-Stack Developer && Project Manager",
    image: "/xynil-pic.jpg",
  },
  {
    name: "Janna Andrea Justiniano",
    role: "UI/UX",
    image: "/janna-pic.jpg",
  },
  {
    name: "John Aiverson Abong",
    role: "Docs",
    image: "/aiverson-pic.jpg",
  },
  {
    name: "Raphael Andre Mercado",
    role: "Front-end",
    image: "/mercado-pic.jpg",
  },
];

export const About = () => {
  const [selectedDev, setSelectedDev] = useState<(typeof Developers)[0] | null>(
    null
  );

  const handleOpenDialog = (developer: (typeof Developers)[0]) => {
    setSelectedDev(developer);
  };

  const handleCloseDialog = () => {
    setSelectedDev(null);
  };

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
              onClick={() => handleOpenDialog(developer)}
            />
          ))}
        </div>
      </div>
      {selectedDev && (
        <ProfileDialog
          isOpen={!!selectedDev}
          onClose={handleCloseDialog}
          name={selectedDev.name}
          role={selectedDev.role}
          image={selectedDev.image}
        />
      )}
    </div>
  );
};

export default About;
