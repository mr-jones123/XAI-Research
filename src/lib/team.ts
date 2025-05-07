export type Developer = {
    name: string
    role: string
    image: string
    linkedinUrl: string
    githubUrl: string
    color?: "blue" | "lightBlue" | "skyBlue" | "teal"
    description?: string
  }
  
  export const getDevelopers = (): Developer[] => [
    {
      name: "Xynil Jhed Lacap",
      role: "Full-Stack Developer && Project Manager",
      image: "/xynil-pic.jpg",
      linkedinUrl: "",
      githubUrl: "",
      color: "blue",
      description: "Leading the development and project management of our explainable AI platform.",
    },
    {
      name: "Janna Andrea Justiniano",
      role: "UI/UX",
      image: "/janna-pic.jpg",
      linkedinUrl: "",
      githubUrl: "",
      color: "lightBlue",
      description: "Creating intuitive and beautiful user experiences for our AI interface.",
    },
    {
      name: "John Aiverson Abong",
      role: "Docs",
      image: "/aiverson-pic.jpg",
      linkedinUrl: "",
      githubUrl: "",
      color: "skyBlue",
      description: "Developing comprehensive documentation and educational resources.",
    },
    {
      name: "Raphael Andre Mercado",
      role: "Full-stack Developer",
      image: "/mercado-pic.jpg",
      linkedinUrl: "",
      githubUrl: "",
      color: "teal",
      description: "Building robust backend systems and frontend interfaces for our platform.",
    },
  ]