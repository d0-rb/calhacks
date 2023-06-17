import * as React from 'react';
import { Card } from '@mui/material';


// size is the size of the component that we are trying to display
export default function meetings(size) {
    return () => {
        <div>
            <Card sx={{ minWidth: 275 }}/>
        </div>
    }
}
