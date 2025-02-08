import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileProps {
  name: string;
  role: string;
  image: string;
}

export const ProfileCard = ({ name, role, image }: ProfileProps) => {
  return (
    <Card className="relative w-40 h-40 p-4 group cursor-pointer overflow-hidden transition-all duration-300">
      <Image
        src={image}
        alt="profilePicture"
        width={600}
        height={600}
        className="object-fill pt-4"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CardHeader>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>

        <CardContent>
          <CardTitle className="text-sm text-gray-500">{role}</CardTitle>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProfileCard;
