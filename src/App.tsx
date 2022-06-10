import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
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
