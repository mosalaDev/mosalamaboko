import React, {useState, useEffect} from 'react';
import {Fab, makeStyles, Fade, useMediaQuery} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function GoUpFloatBtn() {
    const [display, setDisplay] = useState(false);
    const matches = useMediaQuery('(max-width: 599.95px)');

    const handleOnClick = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 1300) {
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        })
    }, [])
    const classes = useStyles();
    return (
        <Fade in={display}>
            <Fab onClick={handleOnClick} size={matches ? "medium" : "large"} variant="extended" color="secondary" className={classes.root}>
                <ArrowUpwardIcon fontSize={matches ? "small": "medium"} />
            </Fab>
        </Fade>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 19,
        borderRadius: '0!important',
    }
}));
