import React from 'react';
import clsx from 'clsx';
import { CircularProgress, makeStyles, fade } from '@material-ui/core';

export default function LoadingModal({ open }) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: 0,
            height: 0,
            backgroundColor: fade(theme.palette.common.black, 0.05),
            position: 'fixed',
            opacity: 0,
            visibility: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        openRoot: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 1,
            visibility: 'visible',
            width: '100vw',
            height: '100vh',
            zIndex: 10000
        },
        progress: {
            backgroundColor: '#fff',
            width: 100,
            height: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 3,
            boxShadow: 'rgb(1 4 9 / 39%) 0px 2px 10px 0px'
        }
    }));

    const classes = useStyles();
    return (
        <div className={clsx(classes.root, {
            [classes.openRoot]: open
        })}>
            <div className={classes.progress}>
                <CircularProgress size={30} />
            </div>
        </div>
    )
}
