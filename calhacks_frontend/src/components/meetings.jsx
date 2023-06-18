import { Card, CardContent, Stack, Typography } from '@mui/material';

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
        return (
          <Card sx={{ width: "100%", height: "100%", borderRadius }} elevation={elevation}>
            <GetMeetings data={data} />
          </Card>
        );
    }
}

function GetMeetings(data) {
    var { data } = data;
    var [
      {
        meetings_today: [{ date: header1 }, ...body1],
      },
      {
        meetings_tomorrow: [{ date: header2 }, ...body2],
      },
      {
        meetings_this_week: [{ week: header3 }, ...body3],
      },
    ] = data;

    return(
        <CardContent>
            <Typography variant="h6" align="center" noWrap={true}>
                {header1}
            </Typography>
            {...mapBody(body1)}
            <Typography variant="h6" align="center" noWrap={true}>
                {header2}
            </Typography>
            {...mapBody(body2)}
            <Typography variant="h6" align="center" noWrap={true}>
                {header3}
            </Typography>
            {...mapBody(body3)}
        </CardContent>
    );
}

function mapBody(body) {
    return body.map((content) => {
        return (
            <Stack direction="row" alignContent="center">
                <Stack direction="column">
                    {getTimeAndLocation(content.time, content.location)}
                </Stack>
                <Typography variant="body1" align="left" noWrap={true} marginTop={"3%"}>
                    {"|  " + content.name}
                </Typography>
            </Stack>
        );
    });
}

function getTimeAndLocation(time, location) {
    return (
        <>
            <Typography variant="body2" align="right" noWrap={true}>
                {time}
            </Typography>
            <Typography variant="caption" align="right" noWrap={true}>
                {location}
            </Typography>
        </>
    )
}

