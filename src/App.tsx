import React from 'react'
import { Grid } from '@mui/material'
import { ForecastView } from './components/views/ForecastView'

const App = () => {
    return (
        <Grid container>
            <ForecastView />
        </Grid>
    )
}

export default App
