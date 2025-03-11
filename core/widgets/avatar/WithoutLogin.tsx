import Link from "next/link";
import React from "react";
 
function authSignin() {
  return (
    <>
      <Link href="/auth/signin" className="text-2xl  ">
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
      </Link>
    </>
  );
}
 
export default authSignin;
 
 