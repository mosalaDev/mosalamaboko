import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

export default function NoData({ message }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="body1" color="inherit">{message}</Typography>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#666'
    }
});
