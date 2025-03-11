import React from "react";
import type { Metadata } from "next";
import Navbar from "@/core/widgets/Navbar";
import Sidebar from "@/core/widgets/Sidebar";
import { GetSession } from "@/core/utilities/GetSession";



export const metadata: Metadata = {
    title: "Advertise with Us - Styxsports",
    description: "Advertise with Styxsports and reach millions of cricket fans globally by showcasing your brand during live streams of thrilling matches and tournaments.",
};

export default async function ChildLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await GetSession();
   

    return (
        <div className="flex flex-col h-screen">
            <Navbar path="" session={session} />
            <main className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1">{children}</div>
            </main>
        </div>
    );
}
