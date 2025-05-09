"use client"
import { ProfileCard } from "./ProfileCard"
import { getDevelopers, type Developer } from "@/lib/team"
import { useState } from "react";
import ProfileDialog from "./dialog";


const TeamSection = () => {

  const teamMembers = getDevelopers();

  const [selectedDev,setSelectedDev] = useState<(typeof teamMembers)[0]|null>(null);


  const handleOpenDialog = (teamMember:(typeof teamMembers)[0])=> {
    setSelectedDev(teamMember);
  }

  const handleCloseDialog = () =>{
    setSelectedDev(null);
  }
 

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the experts behind our explainable AI technology, dedicated to making AI transparent and trustworthy.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member: Developer, index: number) => (
            <ProfileCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              linkedinUrl={member.linkedinUrl}
              githubUrl={member.githubUrl}
              color={member.color as "blue" | "lightBlue" | "skyBlue" | "teal" | undefined}
              onClick={() => handleOpenDialog(member)}
            />
          ))}
        </div>
        </div>
        {selectedDev && (
          <ProfileDialog
            isOpen = {!!selectedDev}
            onClose={handleCloseDialog}
            name={selectedDev.name}
            role = {selectedDev.role}
            image = {selectedDev.image}
            linkedinURL= {selectedDev.linkedinUrl}
            githubURL= {selectedDev.githubUrl}
            />
        )}
        </section>
  
  );
}

export default TeamSection;
