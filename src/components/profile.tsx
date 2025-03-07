import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileProps {
  name: string;
  role: string;
  image: string;
  onClick?: () => void;
}

export const ProfileCard = ({ name, role, image, onClick }: ProfileProps) => {
  return (
    <Card
      className="relative w-64 h-80 group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="inset-0 bg-gradient-to-b from-transparent to-black transition-opacity duration-300">
        <Image
          src={image}
          alt="profilePicture"
          fill
          className="transition-transform duration-300 group-hover:scale-110 object-cover"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-montserrat">
        <CardHeader className="p-0">
          <CardTitle className="text-2x1 font-bold mb-1 text-white ">
            {name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <CardTitle className="text-sm text-white mb-4">{role}</CardTitle>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProfileCard;
