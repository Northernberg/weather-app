import axios, { AxiosResponse } from 'axios'

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

/** Function to reduce and filter out the results from the API */
const reduceAndFilter = (
    total: Record<string, ParsedTimepoint[]>,
    current: Timepoint
): Record<string, ParsedTimepoint[]> => {
    const date = new Date(current.validTime).getDate()
    const parsedTimepoint = {
        validTime: current.validTime,
        temp: current.parameters.find((param) => param.name === 't')?.values[0],
        icon: current.parameters.find((param) => param.name === 'Wsymb2')
            ?.values[0],
    }
    total = {
        ...total,
        [date]:
            total[date] !== undefined
                ? [...total[date], parsedTimepoint]
                : [parsedTimepoint],
    }

    return total
}

export const getWeatherTimeseries = async (
    lon: string,
    lat: string
): Promise<Record<string, ParsedTimepoint[]>> => {
    const res: AxiosResponse<WeatherTimeseriesResponse> = await axios.get(
        `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`
    )

    const reducedRes = res.data.timeSeries.reduce(reduceAndFilter, {})

    return reducedRes
}
