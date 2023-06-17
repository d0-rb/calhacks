import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

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
export default function meetings(size) {
    return (props) => {
        return (
          <Card sx={{ width: "100%", height: "100%" }}>
            <Typography sx={{ fontSize: 14 }} color="text.primary">
              Today's Meetings
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              9:30am - 10:30am | CS 61A Discussion
            </Typography>
          </Card>
        );
    }
}
