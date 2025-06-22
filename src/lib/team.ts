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
    role: "AI Engineer && Full-Stack Developer",
    image: "/xy.jpeg",
    linkedinUrl: "",
    githubUrl: "",
    color: "blue",
    description: "Xy is an AI Engineer. He is responsible for training and developing the model for XeeAI. He loves watching Invincible and like the hero, he seeks to get stronger in the field of tech",
  },
  {
    name: "Janna Andrea Justiniano",
    role: "Full-Stack Developer && UI/UX Designer",
    image: "/janna-pic.jpg",
    linkedinUrl: "",
    githubUrl: "",
    color: "lightBlue",
    description: "Janna is a UI/UX designer and a full-stack developer that developed this beautiful landing page and the chat interface. Hard rock and metal is really her thing. ",
  },
  {
    name: "John Aiverson Abong",
    role: "QA",
    image: "/aiverson-pic.jpg",
    linkedinUrl: "",
    githubUrl: "",
    color: "skyBlue",
    description: "Aiverson is the guy behind the sophisticated documentation of XeeAI, including the software manual and the research paper. He also made sure that our website and model runs smoothly. ",
  },
  {
    name: "Raphael Andre Mercado",
    role: "Full-stack Developer",
    image: "/mercado-pic.jpg",
    linkedinUrl: "",
    githubUrl: "",
    color: "teal",
    description: "Raphael is a full-stack developer who is responsible for the frontend and the backend of XeeAI. He is a HUGE fan of aespa, so don't be surpirsed that his profile is full of the renowed K-pop group.",
  },
]
