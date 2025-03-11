'use client'
import { ButtonTypes } from '@/core/components/ButtonTypes'
import ClientButton from '@/core/components/ClientButton'
import React, { useEffect } from 'react'
 
export default function Signout({
 
}) {
    useEffect(() => {
        async function logout() {
            await fetch("/api/logout", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });
            window.location.href = "/auth/signin";
        }
        logout();
    }, []);
 
 
    function renderErrorContent() {
        return (
            <React.Fragment>
                <div className="text-center">
                    <p className="mt-4 text-white text-2xl font-semibold drop-shadow-md">
                        Signing you out securely. Please wait a moment...
                    </p>
                    <p className="mt-4 text-gray-300 text-sm font-light">
                        Thank you for your patience and understanding.
                    </p>
                </div>
            </React.Fragment>
        )
    }
 
    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen bg-black/30">
 
            <img
                src="/backgrounds/background4.webp"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover -z-20"
            />
 
 
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent -z-10"></div>
 
 
            <div className="relative text-center p-8 rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20 max-w-lg">
                <div className="animate-fade-in">
                    {renderErrorContent()}
                </div>
            </div>
        </div>
    )
}
 