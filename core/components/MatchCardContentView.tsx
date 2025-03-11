import React, { ChangeEventHandler, ChangeEvent, ReactComponentElement } from "react";
import Image from "next/image";
 
 
const MatchCardContentView = (props: { children: React.ReactNode,isDataFound: boolean|null }) => {
    return (
<React.Fragment>
 
            {props.isDataFound ==null && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 

                <div className="w-auto h-80 sm:h-64 lg:h-56 xl:h-64 2xl:w-80 2xl:h-72 rounded-lg bg-gray-200 p-2 flex flex-col gap-2 animate-pulse">
      {/* Image  */}
      <div className="h-2/3 w-full rounded-md bg-gray-300"></div>

      {/* Text  */}
      <div className="flex flex-col gap-1">
        <div className="h-3 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-1 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
      </div>

    </div>
    <div className="w-auto h-80 sm:h-64 lg:h-56 xl:h-64 2xl:w-80 2xl:h-72 rounded-lg bg-gray-200 p-2 flex flex-col gap-2 animate-pulse">
      {/* Image  */}
      <div className="h-2/3 w-full rounded-md bg-gray-300"></div>

      {/* Text  */}
      <div className="flex flex-col gap-1">
        <div className="h-3 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-1 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
      </div>

    </div>
    <div className="w-auto hidden h-80 sm:h-64 lg:h-56 xl:h-64 2xl:w-80 2xl:h-72 rounded-lg bg-gray-200 p-2 md:flex flex-col gap-2 animate-pulse">
      {/* Image  */}
      <div className="h-2/3 w-full rounded-md bg-gray-300"></div>

      {/* Text  */}
      <div className="flex flex-col gap-1">
        <div className="h-3 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-1 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
      </div>

    </div>
    <div className="w-auto hidden h-80 sm:h-64 lg:h-56 xl:h-64 2xl:w-80 2xl:h-72 rounded-lg bg-gray-200 p-2 lg:flex flex-col gap-2 animate-pulse">
      {/* Image  */}
      <div className="h-2/3 w-full rounded-md bg-gray-300"></div>

      {/* Text  */}
      <div className="flex flex-col gap-1">
        <div className="h-3 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
        <div className="h-1 w-1/2 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
      </div>

    </div>

</div>}
            {props.isDataFound ===true && props.children}
</React.Fragment>
    )
}
 
export default MatchCardContentView