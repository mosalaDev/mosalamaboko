import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

export default function LoadingData() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <CircularProgress size={20} color="primary" />
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
})
