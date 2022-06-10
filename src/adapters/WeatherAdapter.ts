import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3001',
})

type Parameter = {
    name: string
    values: number[]
}

type Timepoint = {
    validTime: string
    parameters: Parameter[]
}

export type ParsedTimepoint = {
    validTime: string
    temp?: number
    icon?: number
}

interface WeatherTimeseriesResponse {
    timeSeries: Timepoint[]
}

const filterParameters = (timepoint: Timepoint): ParsedTimepoint => {
    return {
        validTime: timepoint.validTime,
        temp: timepoint.parameters.find((param) => param.name === 't')
            ?.values[0],
        icon: timepoint.parameters.find((param) => param.name === 'Wsymb2')
            ?.values[0],
    }
}

const reduceAndFilter = (
    total: Record<string, ParsedTimepoint[]>,
    current: Timepoint
): Record<string, ParsedTimepoint[]> => {
    const date = new Date(current.validTime).getUTCDate()
    const parsedTimepoint = {
        validTime: current.validTime,
        temp: current.parameters.find((param) => param.name === 't')?.values[0],
        icon: current.parameters.find((param) => param.name === 'Wsymb2')
            ?.values[0],
    }
    total = {
        ...total,
        [date]:
            total[date] != undefined
                ? [...total[date], parsedTimepoint]
                : [parsedTimepoint],
    }
    // let tempArray: ParsedTimepoint[] = []
    // if (total[date] != undefined) {
    //     tempArray = total[date]
    // }
    // tempArray.push(parsedTimepoint)

    // total[date].push(tempArray)

    return total
}

export const getWeatherTimeseries = async (
    lon: string,
    lat: string
): Promise<Record<string, ParsedTimepoint[]>> => {
    const res: AxiosResponse<WeatherTimeseriesResponse> = await instance.get(
        `/`,
        { params: { lon, lat } }
    )

    //const filteredRes = res.data.timeSeries.map(filterParameters)

    const reducedRes = res.data.timeSeries.reduce(reduceAndFilter, {})

    return reducedRes
}
