import React from "react";
 
 
const NoContentView = (props: { children: React.ReactNode, isDataFound: boolean|null }) => {
    return (
<React.Fragment>
            {props.isDataFound === false && props.children}          
</React.Fragment>
    )
}
 
export default NoContentView;