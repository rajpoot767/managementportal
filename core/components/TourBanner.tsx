import React from 'react'
import Image from 'next/image';

import RouteBuilder from '../utilities/RouteBuilder';

interface StaticHeaderImageProps {
    tour_id: string,
  }

  async function isImageAvailable(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok; // Return true if image exists
    } catch {
      return false; // Return false if there is an error
    }
  }
  

  const TourBanner: React.FC<StaticHeaderImageProps> = async ({ tour_id }) => {
    console.log(tour_id);
    
    const blobStorageUrl = RouteBuilder.fetchBannerFromBlobStorage(tour_id) 

    const fallbackImage = "/assets/images/default_banner.jfif";

    // Check if the image exists using the server-side logic
   const imgSrc = await isImageAvailable(blobStorageUrl) ? blobStorageUrl : fallbackImage;

    return (
      <div className={` flex justify-center items-center w-full ${imgSrc === fallbackImage ? 'h-40 md:h-60 lg:h-96' : 'h-auto'}`}>
        {/* Image */}
        <Image
          className=" w-full h-full object-contain object-center z-0 block"
          src={imgSrc}
          width={1280}
          height={720}
          alt="Background"
        />
      </div>
    );
  }
  
  export default TourBanner
