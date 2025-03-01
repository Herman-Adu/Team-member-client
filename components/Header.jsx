"use client";

import NavLink from "./NavLink";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [click, setClick] = useState(false);

  // Navigation items array
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Our Team", path: "/our-team" },
    { label: "About", path: "/about-us" },
    //{ label: "Contact", path: "/contact" },
  ];

  return (
    <div>
      {/* Mobile menu */}
      <header className="bg-white/50 backdrop-blur z-10  sm:hidden">
        <div className="max-w-5xl pl-5 pr-5 mx-auto flex items-center justify-between">
          <Link href="/" alt="home page">
            <img
              className="w-20 h-20 p-4 "
              src="/uploads/adudev-Logo.png"
              alt="logo"
            />
          </Link>

          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={toggleMobileMenu}
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>

        {/* Mobile draw */}
        <div
          className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden z-auto`}
        >
          <div className="flex items-center align-middle justify-between border-b ">
            <Link
              href="/"
              alt="home page"
              onClick={() => setClick(toggleMobileMenu)}
            >
              <img
                className="w-20 h-20 p-4 "
                src="/uploads/adudev-Logo.png"
                alt="logo"
              />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className=" text-slate-600 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 mt-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul
            className={`${
              click ? "nav-menu active" : "nav-menu"
            } flex flex-col h-full gap-4 p-4`}
            onClick={() => setClick(toggleMobileMenu)}
          >
            {navItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-orange-500"
              >
                <NavLink path={item.path} label={item.label} />
              </li>
            ))}
            <li className="mt-4">
              <button className="bg-orand-600 text-white px-8 py-2 rounded-md hover:bg-red-500">
                Login
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Desktop Menu */}
      <header className="bg-white/50 backdrop-blur z-10 hidden sm:block">
        <div className="max-w-5xl pl-5 pr-5 mx-auto flex items-center justify-between">
          <Link href="/" alt="home page">
            <img
              className="w-20 h-20 p-4 "
              src="/uploads/adudev-Logo.png"
              alt="logo"
            />
          </Link>
          <nav>
            <ul className="flex gap-x-7 text-gray-500 text-sm">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-orange-500"
                >
                  <NavLink path={item.path} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
