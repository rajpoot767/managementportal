"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WithLogin from "./avatar/WithLogin";
import WithoutLogin from "./avatar/WithoutLogin";


const Navbar: React.FC <WidgetProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-primary-950 py-3.5 w-full">
      <div className="px-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Image
            width={200}
            height={35}
            src="/assets/logo.png"
            alt="Logo"
          />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex lg:items-center divide-x divide-neutral-600 lg:gap-2 xl:gap-4 text-secondary-300 font-semibold  ">
          
          <li className="pl-4">
            <Link
              href="/dashboard/templates"
              className={
                "font-medium text-white uppercase"
              }
            >
              Templates
            </Link>
            </li>
            
            <li className="pl-4">
            <Link
              href="/dashboard/matches"
              className={
                "font-medium text-white uppercase"
              }
            >
              Active Matches
            </Link>
            </li>
            <li className="pl-4">
            <Link
              href="/dashboard/matches/closeMatches"
              className={
                "font-medium text-white uppercase"
              }
            >
              Close Matches
            </Link>
            </li>
            <li className="pl-4">
            <Link
              href="/dashboard/leads"
              className={
                "font-medium text-white uppercase"
              }
            >
              Leads
            </Link>
            </li>

          <li className="pl-4  ">         
              {props.session && props.session?.truncatedIdentityNo && props.session?.oAuthToken ?<WithLogin path="" session={props.session} /> :< WithoutLogin/>}
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className="text-white md:hidden text-2xl"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className={"  bg-primary-950 fixed top-16 left-0 w-full z-40 text-secondary-300 py-3 transition-all duration-200 ease-in-out"}>
          <ul className="flex flex-col items-start px-6 space-y-4 font-semibold">
            <li>
              <Link
                href="/"
                className={"text-lg text-white "}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/cricket/series/schedule"
                className={
                  "text-lg text-white"
                }
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/cricket/series/live-stream"
                className={
                  "text-lg text-white"
                }
              >
                Live Streaming
              </Link>
            </li>
            <li>
              <Link href="/cricket/series/live-score"
                className={
                  "text-lg text-white"
                }
              >Live Score</Link>
            </li>
            <li>
              <Link
                href="/cricket/series/match-highlights/search"
                className={
                  "text-lg text-white"
                }
              >
                Highlights
              </Link>
            </li>
            <li className="">
              <Link
                href="/pages/advertise-with-us"
                className={
                  "text-lg text-white "
                }
              >
                Advertise with Us
              </Link>

            </li>
            <li>
              <a href="/auth/signin" className="text-2xl">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 14.3049 3.86647 16.4075 5.29146 17.9997C6.94 16.1586 9.3347 15 12 15C14.6655 15 17.0604 16.1588 18.7083 18C20.1334 16.4077 21 14.3051 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM15.5 9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
