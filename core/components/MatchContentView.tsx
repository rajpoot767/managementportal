import React from "react";
 
 
const MatchContentView = (props: { children: React.ReactNode,isDataFound: boolean|null }) => {
    return (
<React.Fragment>
 
            {props.isDataFound ==null && <div> <div className="">
<div className="mt-4 bg-gray-200 rounded-md p-4 animate-pulse">
<div className="flex items-center mb-4">
<div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse"></div>
<div className="ml-2">
<div className="bg-gray-300 h-3 w-16 animate-pulse"></div>
<div className="bg-gray-300 h-2 w-12 animate-pulse"></div>
</div>
</div>
<div className="grid grid-cols-3 gap-4 mt-6">
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div> 
</div>
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div>
</div>
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div>
</div>
</div>
</div>
</div>
<div className="">
<div className="mt-4 bg-gray-200 rounded-md p-4 animate-pulse">
<div className="flex items-center mb-4">
<div className="bg-gray-300 h-8 w-8 rounded-full animate-pulse"></div>
<div className="ml-2">
<div className="bg-gray-300 h-3 w-16 animate-pulse"></div>
<div className="bg-gray-300 h-2 w-12 animate-pulse"></div>
</div>
</div>
<div className="grid grid-cols-3 gap-4 mt-6">
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div> 
</div>
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div>
</div>
<div className="animate-pulse">
<div className="bg-gray-300 rounded-full h-3 w-12 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-24 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-32 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-16 mb-2"></div>
<div className="bg-gray-300 rounded-full h-3 w-28 mb-2"></div>
</div>
</div>
</div>
</div>
</div>}
            {props.isDataFound ===true && props.children}
</React.Fragment>
    )
}
 
export default MatchContentView