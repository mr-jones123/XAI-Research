"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();

  return pathname !== "/chatbot" && "/error" ? <NavBar /> : null;
}
