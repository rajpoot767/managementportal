import React from 'react'

const TemplateIcon: React.FC<IconProps> = (props) => {
    return (
        <svg  xmlns="http://www.w3.org/2000/svg"  className={props.className} viewBox="0 0 24 24">
            <path fill="none"  strokeWidth="1" d="M1,3 L23,3 L23,21 L1,21 L1,3 Z M1,8 L23,8 M7,8 L7,21" />
        </svg>)
}

export default TemplateIcon;