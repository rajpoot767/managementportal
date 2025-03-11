import React from 'react'
import Image from 'next/image';
import staticBanner from '../../public/assets/images/about_us.webp'
interface StaticHeaderImageProps {
    heading: string;
  }
  
  const StaticHeaderImage: React.FC<StaticHeaderImageProps> = ({ heading }) => {
    return (
      <div className="relative flex justify-center items-center pt-6 sm:pt-0 w-full h-36 sm:h-80 overflow-hidden">
        {/* Image */}
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover object-bottom z-0 block"
          src={staticBanner}
          alt="Background"
        />
  
        {/* Heading */}
        <h1 className="text-white text-3xl  text-center sm:text-6xl font-bold relative z-10 flex justify-center items-center h-full">
        {heading}
        </h1>
      </div>
    );
  }
  
  export default StaticHeaderImage
