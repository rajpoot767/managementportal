import React, { FC } from 'react'
import IconsMap from './IconsMap'

const Icon: FC<IconProps> = ({ name, className, ...props }) => {
    const IconComponent = IconsMap[name];

    if (!IconComponent) {
        console.error(`Icon "${name}" not found`);
        return null;
    }
    return <IconComponent {...props} className={className} />

}

export default Icon;