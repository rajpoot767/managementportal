"use client";
import React, { useEffect, useRef, useState } from "react";



function generateAvatarName(name: string): string {
    if (!name || typeof name !== "string") {
        return ""; // Return an empty string if the input is invalid
    }

    const names = name.trim().split(" ");
    const firstInitial = names[0]?.charAt(0).toUpperCase() || "";
    const secondInitial = names[1]?.charAt(0).toUpperCase() || "";

    return firstInitial + secondInitial;
}

const WithLogin: React.FC<WidgetProps> = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open state
    const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu for detecting clicks outside
    const buttonRef = useRef<HTMLButtonElement>(null);
    const shortName = generateAvatarName(props.session.fullName || "");

    // Func to toggle the menu
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    // Close the menu if the user clicks outside of the menu or button
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-10 flex items-center justify-center">
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="h-9 w-9 bg-[#620065] hover:bg-primary text-white rounded-full flex items-center justify-center font-semibold"
            >
                {shortName}
            </button>

            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute bg-white shadow-lg py-2 w-64 left-0 lg:left-auto lg:right-0 top-14 flex flex-col justify-center items-center gap-2 rounded-lg border border-neutral-200"
                >
                    <div className="bg-gray-50 text-center font-normal py-4 px-4 w-full">
                        <h3 className="font-semibold text-lg text-primary-950">
                            {props.session.fullName}
                        </h3>
                        <p className="text-primary-900 text-sm">{props.session.truncatedIdentityNo}</p>
                    </div>
                    <div className="w-full px-4">
                        <button
                            className=" bg-primary-950 hover:bg-primary-900 py-2 px-7 w-full rounded text-white text-sm"
                            onClick={() => (window.location.href = `/auth/signout`)}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WithLogin;

