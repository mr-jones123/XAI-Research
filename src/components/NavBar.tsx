"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkClass = (href: string) =>
    pathname === href
      ? "block py-2 px-3 md:p-0 text-blue-700 font-medium"
      : "block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 transition-colors";

  return (
    <nav className="bg-white border-gray-200 sticky top-0 z-50 shadow-sm px-4">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <Image
            src="/XeeAI Logo (Draft).svg"
            className="h-8"
            width={30}
            height={30}
            alt="XeeAI Logo"
          />
          <span className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap">
            XeeAI
          </span>
        </Link>

        {/* Mobile menu button */}
        <Button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-menu"
          aria-expanded={isOpen ? "true" : "false"}
          variant="link"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Navigation links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 md:relative md:block md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none`}
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:items-center md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={linkClass("/")}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" className={linkClass("/#about")}>
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/chatbot" 
                className={linkClass("/chatbot")}
                onClick={() => setIsOpen(false)}
              >
                Chatbot
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
