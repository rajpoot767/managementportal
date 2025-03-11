import React from "react";
import footerBanner from "../../public/assets/images/footer-banner.png"
import Image from "next/image";


function FooterBanner() {
  return (  
    <div className="px-2 sm:px-0 bg-secondary-50">
      <div className=" flex justify-center items-center mb-12">
        

        <div className="relative">
        <div className=" absolute  text-xl bottom-6 left-5 sm:text-4xl sm:bottom-12 sm:left-11 md:text-5xl md:bottom-20 md:left-16 text-white">Cricket <h1 className="md:mt-4 font-bold">LIVE STREAMING</h1> <h1 className="md:mt-4 text-2xl font-bold"> Styxsports.com</h1></div>
        <Image
          src={footerBanner}
          alt="banner"
        />
        </div>
      </div>
    </div>
  );
}

export default FooterBanner;
