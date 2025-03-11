import React from 'react'
import Image from 'next/image';
import stream_bg from '../../public/assets/images/stream_bg.png'
interface HighLightSeriseBGProps {
    heading: string;
  }
  
  const HighLightSeriseBG: React.FC<HighLightSeriseBGProps> = ({ heading }) => {
    return (
      <div className="relative flex justify-center items-center pt-6 sm:pt-0 w-full h-36 sm:h-36 overflow-hidden">
        {/* Image */}
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover object-bottom z-0 block"
          src={stream_bg}
          alt="Background"
        />
  
        {/* Heading */}
        <h1 className="container text-white text-3xl   text-center sm:text-3xl font-extralight relative z-10 flex justify-center items-center h-1/2">
        <span>
          {heading}
        </span>
        </h1>
      </div>
    );
  }
  
  export default HighLightSeriseBG
