import {
    Button,
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from '@mui/material'
import { useState } from 'react'
import {
    getWeatherTimeseries,
    ParsedTimepoint,
} from '../../adapters/WeatherAdapter'
import { OverviewCard } from 'components'
import { HalfSunIcon } from 'components/icons'

interface LatLonstate {
    lon: string
    lat: string
}

export const ForecastView = () => {
    const [state, setState] = useState<LatLonstate>({
        lon: '',
        lat: '',
    })
    const [err, setErr] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [timeSeries, setTimeSeries] = useState<
        Record<string, ParsedTimepoint[]>
    >({})

    const handleSubmit = () => {
        setErr(false)
        setLoading(true)
        getWeatherTimeseries(state.lon, state.lat)
            .then((res) => {
                setTimeSeries(res)
            })
            .catch(() => {
                setTimeSeries({})
                setErr(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const fetchPosition = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            // Set to maximum 6 decimal as described in the SMHI API.
            setState({
                lon: location.coords.longitude.toFixed(6).toString(),
                lat: location.coords.latitude.toFixed(6).toString(),
            })
        })
    }

    return (
        <Grid container padding={4} gap={2}>
            <Button variant="contained" onClick={fetchPosition}>
                Hämta min position
            </Button>
            <Grid container gap={2} wrap="nowrap">
                <TextField
                    label="Longitude"
                    type="number"
                    value={state.lon}
                    onChange={(event) =>
                        setState({ ...state, lon: event.target.value })
                    }
                />
                <TextField
                    label="Latitude"
                    type="number"
                    value={state.lat}
                    onChange={(event) =>
                        setState({ ...state, lat: event.target.value })
                    }
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={state.lon === '' || state.lat === ''}
                >
                    Visa väderprognos
                </Button>
            </Grid>

            <Grid container item direction="column" md={8} gap={2}>
                {isLoading && <CircularProgress sx={{ margin: 'auto' }} />}
                {err && (
                    <Typography color="error">
                        Kunde inte hitta väderprognos
                    </Typography>
                )}
                {Object.entries(timeSeries).map(([timestamp, timepoints]) => (
                    <OverviewCard key={timestamp} timepoints={timepoints} />
                ))}
            </Grid>
        </Grid>
    )
}
