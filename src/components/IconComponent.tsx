import React, { FC } from 'react'
import {
    CloudDrizzleIcon,
    CloudIcon,
    CloudLightningIcon,
    CloudSnowIcon,
    CloudRainIcon,
    SunIcon,
} from './icons'

interface IconComponentProps {
    weatherInt: number
}

export const IconComponent: FC<IconComponentProps> = ({ weatherInt }) => {
    /**
     * Range 1-4 == Sun
     * Range 5-7 == Cloud
     * Range 8-9 = Light rain
     * Range 10
     *
     * @returns Icon Element
     */
    const switchIcon = () => {
        // Sunny
        if (weatherInt >= 1 && weatherInt <= 4) {
            return <SunIcon />
        }
        // Cloudy
        if (weatherInt >= 5 && weatherInt <= 7) {
            return <CloudIcon />
        }
        // Light and moderate rain
        if (
            (weatherInt >= 8 && weatherInt <= 9) ||
            (weatherInt >= 18 && weatherInt <= 19)
        ) {
            return <CloudDrizzleIcon />
        }
        // Heavy rain
        if (weatherInt === 10 || weatherInt === 20) {
            return <CloudRainIcon />
        }
        // Lightningstorm and thunder
        if (weatherInt === 11 || weatherInt === 21) {
            return <CloudLightningIcon />
        }
        // Snow/sleet
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
