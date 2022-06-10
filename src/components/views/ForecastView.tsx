import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import {
    getWeatherTimeseries,
    ParsedTimepoint,
} from '../../adapters/WeatherAdapter'
import { IconComponent } from '../IconComponent'
import { format, parseISO } from 'date-fns'
import { ClockIcon } from '../icons'

interface LatLonstate {
    lon: string
    lat: string
}

export const ForecastView = () => {
    const [state, setState] = useState<LatLonstate>({
        lon: '13.819552',
        lat: '55.433993',
    })

    const [timeSeries, setTimeSeries] = useState<
        Record<string, ParsedTimepoint[]>
    >({})

    const handleSubmit = () => {
        getWeatherTimeseries(state.lon, state.lat).then((res) => {
            console.log(res)
            setTimeSeries(res)
        })
    }

    return (
        <Grid container padding={4}>
            <TextField
                label="Longitude"
                value={state.lon}
                onChange={(event) =>
                    setState({ ...state, lon: event.target.value })
                }
            />
            <TextField
                label="Latitude"
                value={state.lat}
                onChange={(event) =>
                    setState({ ...state, lat: event.target.value })
                }
            />
            <Button onClick={handleSubmit}>Visa väderprognos</Button>

            <Grid container direction="column" gap={2}>
                {Object.entries(timeSeries).map(([timestamp, timepoint]) => {
                    const date = parseISO(timepoint[0].validTime)
                    console.log(date)
                    return (
                        <>
                            <Grid
                                container
                                key={timepoint[0].validTime}
                                padding={2}
                                border={1}
                            >
                                <Grid container gap={4}>
                                    <ClockIcon />
                                    <Typography> Temperatur</Typography>
                                </Grid>
                                <Grid container wrap="nowrap" gap={4}>
                                    <Typography>
                                        {format(date, 'd MMM')}
                                    </Typography>
                                    <Typography>{date.getHours()}</Typography>
                                    {timepoint[0].temp && (
                                        <Typography>
                                            {Math.round(timepoint[0].temp)}
                                        </Typography>
                                    )}
                                    <IconComponent
                                        weatherInt={timepoint[0].icon || 0}
                                    />
                                </Grid>
                            </Grid>
                        </>
                    )
                })}
            </Grid>
        </Grid>
    )
}
