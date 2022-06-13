import React, { FC } from 'react'
import {
    CloudDrizzleIcon,
    CloudIcon,
    CloudLightningIcon,
    CloudSnowIcon,
    CloudRainIcon,
    SunIcon,
    HalfSunIcon,
} from './icons'

interface IconComponentProps {
    weatherInt: number
}

export const IconComponent: FC<IconComponentProps> = ({ weatherInt }) => {
    /**
     * Range 1-2 = Sun
     * Range 3-4 = HalfSun (variable cloudiness)
     * Range 5-7 = Cloud
     * Range 8-9 = Light rain
     * Int 10 or 20 = Moderate rain
     * Int 11 or 21 = Lighting
     * Range 12-17 and 22-27 = snow
     * @returns Icon Element
     */
    const switchIcon = () => {
        if (weatherInt >= 1 && weatherInt <= 2) {
            return <SunIcon />
        }
        if (weatherInt >= 3 && weatherInt <= 4) {
            return <HalfSunIcon />
        }
        if (weatherInt >= 5 && weatherInt <= 7) {
            return <CloudIcon />
        }
        if (
            (weatherInt >= 8 && weatherInt <= 9) ||
            (weatherInt >= 18 && weatherInt <= 19)
        ) {
            return <CloudDrizzleIcon />
        }
        if (weatherInt === 10 || weatherInt === 20) {
            return <CloudRainIcon />
        }
        if (weatherInt === 11 || weatherInt === 21) {
            return <CloudLightningIcon />
        }
        if (
            (weatherInt >= 12 && weatherInt <= 17) ||
            (weatherInt >= 22 && weatherInt <= 27)
        ) {
            return <CloudSnowIcon />
        }
        return <CloudIcon />
    }
    return <>{switchIcon()}</>
}
