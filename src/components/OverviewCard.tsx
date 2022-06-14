import { Grid, Typography, Collapse } from '@mui/material'
import { format, parseISO } from 'date-fns'
import React, { FC, useState } from 'react'
import { IconComponent, OverviewHeader } from 'components'
import { ParsedTimepoint } from '../adapters/WeatherAdapter'

interface OverviewCardProps {
    timepoints: ParsedTimepoint[]
}

export const OverviewCard: FC<OverviewCardProps> = ({ timepoints }) => {
    const [isExpanded, setExpanded] = useState(false)
    // Get middlepoint of the timepoints to display in the overviewheader
    const middleTimepoint =
        timepoints[Math.abs(Math.round(timepoints.length / 2) - 1)]
    return (
        <Grid container>
            <OverviewHeader
                timepoint={middleTimepoint}
                onClick={() => setExpanded(!isExpanded)}
            />
            <Collapse in={isExpanded} sx={{ width: '100%' }}>
                <Grid
                    container
                    item
                    gap={2}
                    wrap="nowrap"
                    paddingY={2}
                    bgcolor="#eeeeee"
                    borderBottom={1}
                >
                    <Grid container item xs={4} justifyContent="center">
                        <Typography>Väder</Typography>
                    </Grid>
                    <Grid container item justifyContent="center" xs={4}>
                        <Typography>Tid</Typography>
                    </Grid>
                    <Grid container item justifyContent="center" xs={4}>
                        <Typography>Temperatur</Typography>
                    </Grid>
                </Grid>
                {timepoints.map((timepoint) => (
                    <Grid
                        key={timepoint.validTime}
                        container
                        borderBottom={1}
                        paddingY={1}
                    >
                        <Grid container item xs={4} justifyContent="center">
                            <IconComponent weatherInt={timepoint.icon || 0} />
                        </Grid>
                        <Grid container item xs={4} justifyContent="center">
                            <Typography variant="body2">
                                {format(parseISO(timepoint.validTime), 'HH')}
                            </Typography>
                        </Grid>
                        <Grid container item xs={4} justifyContent="center">
                            <Typography variant="body2">
                                {timepoint.temp?.toFixed(0)}
                                &#8451;
                            </Typography>
                        </Grid>
                    </Grid>
                ))}
            </Collapse>
        </Grid>
    )
}
