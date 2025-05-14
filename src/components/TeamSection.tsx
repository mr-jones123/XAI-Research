"use client";
import { ProfileCard } from "./ProfileCard";
import { getDevelopers, type Developer } from "@/lib/team";
import { useState } from "react";
import ProfileDialog from "./ProfileDialog";

const TeamSection = () => {
  const teamMembers = getDevelopers();

  const [selectedDev, setSelectedDev] = useState<
    (typeof teamMembers)[0] | null
  >(null);

  const handleOpenDialog = (teamMember: (typeof teamMembers)[0]) => {
    setSelectedDev(teamMember);
  };

  const handleCloseDialog = () => {
    setSelectedDev(null);
  };
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 md:mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-2">
            Meet the experts behind our explainable AI technology, dedicated to
            making AI transparent and trustworthy.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {teamMembers.map((member: Developer, index: number) => (
            <ProfileCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedinUrl={member.linkedinUrl}
              githubUrl={member.githubUrl}
              color={
                member.color as
                  | "blue"
                  | "lightBlue"
                  | "skyBlue"
                  | "teal"
                  | undefined
              }
              onClick={() => handleOpenDialog(member)}
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
          linkedinURL={selectedDev.linkedinUrl}
          githubURL={selectedDev.githubUrl}
        />
      )}
    </section>
  );
};

export default TeamSection;
