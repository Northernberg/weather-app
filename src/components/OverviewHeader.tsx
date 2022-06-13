import { Grid, Typography } from '@mui/material'
import { format, parseISO } from 'date-fns'
import React, { FC } from 'react'
import { ParsedTimepoint } from '../adapters/WeatherAdapter'
import { IconComponent } from './IconComponent'
import { ClockIcon, ThermometerIcon } from './icons'

interface OverviewHeaderProps {
    timepoint: ParsedTimepoint
    onClick: () => void
}

export const OverviewHeader: FC<OverviewHeaderProps> = ({
    timepoint,
    onClick,
}) => {
    return (
        <Grid
            container
            item
            key={timepoint.validTime}
            paddingY={2}
            border={1}
            boxShadow={1}
            wrap="nowrap"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(66,165,245,0.2)',
                    borderColor: 'primary.main',
                },
            }}
            onClick={onClick}
        >
            <Grid container item xs={4} justifyContent="center">
                <IconComponent weatherInt={timepoint.icon || 0} />
            </Grid>
            <Grid
                container
                item
                xs={4}
                gap={1}
                wrap="nowrap"
                justifyContent="center"
            >
                <ClockIcon />
                <Typography fontWeight="bold" variant="body1">
                    {format(parseISO(timepoint.validTime), 'd MMM')}
                </Typography>
            </Grid>

            <Grid
                container
                item
                xs={4}
                gap={1}
                wrap="nowrap"
                justifyContent="center"
            >
                <ThermometerIcon />
                {timepoint.temp && (
                    <Typography fontWeight="bold" variant="body1">
                        {timepoint.temp.toFixed(0)} &#8451;
                    </Typography>
                )}
            </Grid>
        </Grid>
    )
}
