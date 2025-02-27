"use client";

import NavLink from "./NavLink";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items array
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Our Team", path: "/our-team" },
    { label: "About", path: "/about-us" },
    //{ label: "Contact", path: "/contact" },
  ];

  return (
    <div>
      {/* Mobile Menu */}
      <header className="bg-white/50 backdrop-blur z-10  md:hidden">
        <div className="max-w-5xl pl-5 pr-5 mx-auto flex items-center justify-between">
          <h2 className="text-2xl text-gray-500 py-6">Adu Dev LTD</h2>
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

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 z-30 min-h-screen w-96 bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden z-auto`}
        >
          <div className="flex flex-row items-center border-b pb-4 z-30">
            <NavLink path="/" label="Home Page" />
            <button
              onClick={toggleMobileMenu}
              className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col h-full gap-4 p-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
              >
                <NavLink path={item.path} label={item.label} />
              </li>
            ))}
            <li className="mt-4">
              <button className="bg-red-600 text-white px-8 py-2 rounded-md hover:bg-red-500">
                Login
              </button>
            </li>
          </ul>
        </div>
      </header>
      {/* Desktop Menu */}
      <header className="bg-white/50 backdrop-blur z-10 hidden md:block">
        <div className="max-w-5xl pl-5 pr-5 mx-auto flex items-center justify-between">
          <h2 className="text-2xl text-gray-500 py-6">Adu Dev LTD</h2>
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
