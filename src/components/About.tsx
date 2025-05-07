"use client";
import React, { useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import ProfileDialog from "./dialog";
import { getDevelopers } from "@/lib/team";

const developers = getDevelopers();

export const About = () => {
  const [selectedDev, setSelectedDev] = useState<(typeof developers)[0] | null>(
    null
  );

  const handleOpenDialog = (developer: (typeof developers)[0]) => {
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
          {developers.map((developer, index) => (
            <ProfileCard
              key={index}
              name={developer.name}
              role={developer.role}
              image={developer.image}
              linkedinUrl={developer.linkedinUrl}
              githubUrl={developer.githubUrl}
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
