"use client";
import Image from "next/image";
import Link from "next/link";

interface ProfileProps {
  name: string;
  role: string;
  image: string;
  linkedinUrl: string;
  githubUrl: string;
  color?: "blue" | "lightBlue" | "skyBlue" | "teal";
  onClick?: () => void;
}

export const ProfileCard = ({
  name,
  role,
  image,
  linkedinUrl,
  githubUrl,
  color = "blue",
  onClick,
}: ProfileProps) => {
  const colorVariants = {
    blue: "bg-blue-100",
    lightBlue: "bg-blue-50",
    skyBlue: "bg-sky-100",
    teal: "bg-teal-50",
  };
  return (
    <div className="w-full sm:w-64 cursor-pointer group" onClick={onClick}>
      <div
        className={`${colorVariants[color]} aspect-square pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6 text-center`}
      >
        <h3 className="font-bold text-lg sm:text-xl text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>

      <div className="relative h-48 sm:h-64 rounded-b-full overflow-hidden bg-gray-800">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={image || "/placeholder.svg?height=400&width=300"}
            alt={`${name} profile picture`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {linkedinUrl && linkedinUrl !== "" && (
            <Link
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            ></Link>
          )}

          {githubUrl && githubUrl !== "" && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            ></Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
