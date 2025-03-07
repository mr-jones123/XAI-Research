import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "block py-2 px-3 md:p-0 text-blue-700"
      : "block py-2 px-3 md:p-0 text-gray-900";

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
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
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            XeeAI
          </span>
        </Link>
        <div className="flex-grow"></div>
        <div
          className={`items-center justify-end ${
            isOpen ? "flex" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-cta"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="block py-2 px-3 md:p-0 text-gray-900"
              >
                About
              </Link>
            </li>
            <li>
              <Link href="/register" className={linkClass("/register")}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
