import React from 'react'

const AddIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill='white'
        strokeWidth='1'
        stroke='white'
        className={props.className}
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
        />
    </svg>


    )
}

export default AddIcon