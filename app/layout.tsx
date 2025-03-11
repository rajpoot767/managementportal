import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Toast from "@/core/components/Toast";
import { Poppins } from 'next/font/google';
import { Roboto } from 'next/font/google';
// import Footer from "@/core/widgets/home/Footer";
// import Navbar from "@/core/widgets/home/Navbar";
// @typescript-eslint/no-unused-vars
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'], 
});

export const metadata: Metadata = {
  title: "Sign In - StyxSports",
  description: "Access your StyxSports account to explore the latest updates, track your activities, and stay connected to your favorite sports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={roboto.className} >     
        {children}    
        <Toast />
      </body>
    </html>
  );
}
