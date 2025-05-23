"use client";

import { usePathname } from "next/navigation";
// Update the import path if the NavBar component is located elsewhere, for example:
import NavBar from "../components/NavBar";

export default function NavBarWrapper() {
  const pathname = usePathname();

  return !pathname.startsWith("/chatbot") ? <NavBar /> : null;
}
