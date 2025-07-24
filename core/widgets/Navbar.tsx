"use client"
import React, { useState } from "react";
import Link from "next/link";


import Icon from "../icons/Icon";


const Navbar: React.FC <WidgetProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-neutral-50 py-3.5 w-full">
      <div className="px-4 flex justify-between items-center text-black">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* <Image
            width={200}
            height={35}
            src="/assets/logo.png"
            alt="Logo"
          /> */}
          <Icon name="hospitalIcon" className="w-10 h-10 bg" />
          <h3 className="text-2xl font-bold">Navi Hospital</h3>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex lg:items-center divide-x divide-neutral-600 lg:gap-2 xl:gap-4  font-semibold  ">
          
          <li className="pl-4">
            <Link
              href="/dashboard/ds"
              className={
                "font-medium  uppercase"
              }
            >
             Users Management
            </Link>
            </li>
            
            <li className="pl-4">
            <Link
              href="/dashboard/matches"
              className={
                "font-medium  uppercase"
              }
            >
              Roles & Permissions
            </Link>
            </li>
            <li className="pl-4">
            <Link
              href="/dashboard/matches/closeMatches"
              className={
                "font-medium  uppercase"
              }
            >
             Staff Scheduling
            </Link>
            </li>
            <li className="pl-4">
            <Link
              href="/dashboard/leads"
              className={
                "font-medium uppercase"
              }
            >
              Analysis & Reports
            </Link>
            </li>

          {/* <li className="pl-4  ">         
              {props.session && props.session?.truncatedIdentityNo && props.session?.oAuthToken ?<WithLogin path="" session={props.session} /> :< WithoutLogin/>}
          </li> */}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleMenu}
          className=" md:hidden text-2xl"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {/* {isMenuOpen && (
        <div className={"  bg-primary-950 fixed top-16 left-0 w-full z-40 py-3 transition-all duration-200 ease-in-out"}>
          <ul className="flex flex-col items-start px-6 space-y-4 font-semibold">
            <li>
              <Link
                href="/"
                className={"text-lg  "}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/cricket/series/schedule"
                className={
                  "text-lg "
                }
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/cricket/series/live-stream"
                className={
                  "text-lg "
                }
              >
                Live Streaming
              </Link>
            </li>
            <li>
              <Link href="/cricket/series/live-score"
                className={
                  "text-lg "
                }
              >Live Score</Link>
            </li>
            <li>
              <Link
                href="/cricket/series/match-highlights/search"
                className={
                  "text-lg "
                }
              >
                Highlights
              </Link>
            </li>
            <li className="">
              <Link
                href="/pages/advertise-with-us"
                className={
                  "text-lg  "
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
      )} */}
    </div>
  );
};

export default Navbar;
