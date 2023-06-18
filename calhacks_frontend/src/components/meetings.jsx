import { useEffect, useState } from 'react';
import { Box, Card, CardContent, IconButton, Stack, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './meetings.css'

/*
    -------------------------------------------------
    Today's Meetings
    -------------------------------------------------
    9:30am - 10:30am | CS 61A Discussion
    11:00am - 12:00pm | CS 61A Lecture
    1:00pm - 2:00pm | CS 61A Lab
    2:00pm - 3:00pm | CS 61A Office Hours
    -------------------------------------------------
    Tomorrow's Meetings
    -------------------------------------------------
    9:30am - 10:30am | CS 61A Discussion
    11:00am - 12:00pm | CS 61A Lecture
    1:00pm - 2:00pm | CS 61A Lab
    2:00pm - 3:00pm | CS 61A Office Hours
    -------------------------------------------------
    This Week's Meetings
    -------------------------------------------------
    9:30am - 10:30am | CS 61A Discussion
    11:00am - 12:00pm | CS 61A Lecture
    1:00pm - 2:00pm | CS 61A Lab
    2:00pm - 3:00pm | CS 61A Office Hours
    -------------------------------------------------
*/

// size is the size of the component that we are trying to display
// not actually the component, just the function that returns a component that returns html stuff
export default function meetings(size, borderRadius, elevation) {
    return ({ data }) => {
        const [prevIdx, setPrevIdx] = useState(0);
        const [currentIdx, setCurrentIdx] = useState(0);
        const [transitionClass, setTransitionClass] = useState('MeetingsSlideDown');

        useEffect(() => {
            if (currentIdx - prevIdx > 0) {  // if we scrolled down
                if (transitionClass === 'MeetingsSlideUp1') {
                    setTransitionClass('MeetingsSlideUp2');
                } else {
                    setTransitionClass('MeetingsSlideUp1');
                }
            } else {
                if (transitionClass === 'MeetingsSlideDown1') {
                    setTransitionClass('MeetingsSlideDown2');
                } else {
                    setTransitionClass('MeetingsSlideDown1');
                }
            }

            setPrevIdx(currentIdx);
        }, [currentIdx]);

        const sortedData = data.sort((a, b) => a.time - b.time);
        const dataByDay = {};
        
        for (let i = 0; i < sortedData.length; i++) {
            const day = Math.floor(sortedData[i].time / (60 * 60 * 24)) * (60 * 60 * 24);
            const dataFromThatDay = dataByDay[day];

            if (dataFromThatDay) {
                dataFromThatDay.push(sortedData[i]);
            } else {
                dataByDay[day] = [sortedData[i]];
            }
        }

        const minDay = Math.min(...Object.keys(dataByDay));
        const maxDay = Math.max(...Object.keys(dataByDay));
        const dataArrayByDay = [];

        for (let i = minDay; i <= maxDay; i += 60 * 60 * 24) {
            if (!dataByDay[i]) {
                dataArrayByDay.push({events: []});
            } else {
                dataArrayByDay.push({events: dataByDay[i]});
            }
            
            dataArrayByDay[dataArrayByDay.length - 1].time = new Date(i * 1000);

            if (i === Math.floor(Date.now() / (1000 * 60 * 60 * 24))) {
                setCurrentIdx(i);
            }
        }

        return (
          <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
            <Stack className={transitionClass} sx={{ width: "100%", height: "300%", borderRadius, marginTop: '-81.5%' }} direction="column" spacing={0}>
                <MeetingCard setIdx={setCurrentIdx} idx={prevIdx - 1} data={dataArrayByDay} />
                <MeetingCard setIdx={setCurrentIdx} idx={prevIdx} data={dataArrayByDay} />
                <MeetingCard setIdx={setCurrentIdx} idx={prevIdx + 1} data={dataArrayByDay} />
            </Stack>
          </Card>
        );
    }
}

function MeetingCard({ setIdx, idx, data }) {
    const theme = useTheme();
    
    if (idx < 0 || idx >= data.length) {
        return (
            <Box sx={{ width: '100%', height: '100%' }} />
        )
    }

    const date = data[idx].time;

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Typography sx={{ width: '100%', height: '10%', align: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginTop: '4%' }}>
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Typography>
            {idx > 0 ?
                <IconButton sx={{ position: 'absolute', top: '4%', right: '4%', float: 'right', padding: '3%' }} aria-label="previous" onClick={() => {setIdx(idx - 1)}}>
                    <ExpandLessIcon />
                </IconButton>
                : null
            }
            {idx < data.length - 1 ?
                <IconButton sx={{ position: 'absolute', bottom: '4%', right: '4%', float: 'right', padding: '3%' }} aria-label="next" onClick={() => {setIdx(idx + 1)}}>
                    <ExpandMoreIcon />
                </IconButton>
                : null
            }
            <Grid sx={{ width: '100%', paddingTop: '6%' }} container spacing={2}>
                {data[idx].events.map((event) => {
                    const eventTime = new Date(event.time * 1000);

                    return (
                        <>
                            <Grid item xs={4.5}>
                                <Typography align="right" variant="h5" sx={{ width: '100%', height: '100%' }}>
                                    {eventTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}
                                </Typography>
                            </Grid>
                            <Grid item xs={7.5}>
                                <Typography align="left" variant="h6" sx={{ width: '100%' }}>
                                    {event.name}
                                </Typography>
                                <Typography align="left" variant="body2" sx={{ width: '100%', color: theme.palette.text.secondary }}>
                                    {event.location}
                                </Typography>
                            </Grid>
                        </>
                    );
                })}
            </Grid>
        </Box>
    );
}
