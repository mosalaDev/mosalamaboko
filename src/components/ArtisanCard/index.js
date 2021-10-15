import React from 'react';
import { Typography, makeStyles, fade } from '@material-ui/core';

export default function ArtisanCard(props) {
    const { service } = props;

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.icon}>
                    <img src={service.image} alt={service.nom_departement} />
                </div>
                <Typography variant="body1" className={classes.title}>{service.nomination}</Typography>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        "&:not(:last-child)": {
            marginRight: 10,
        },
    },
    card: {
        height: 115,
        width: 185,
        backgroundColor: fade(theme.palette.common.white, 0.1),
        boxShadow: "0px 3px 7px -3px rgb(0 0 0 / 8%), 0px 2px 9px -2px rgb(0 0 0 / 6%), 0px 1px 20px 1px #4444441f",
        borderRadius: 0,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        textAlign: 'center',
        "&:hover": {
            backgroundColor: fade(theme.palette.primary.main, 0.1),
        }
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        overflow: 'hidden',
        marginBottom: 15
    },
    title: {
        fontWeight: 'bold',
        lineHeight: 1,
        textTransform: 'capitalize'
    },
    [theme.breakpoints.down('xs')]: {
        container: {
            width: '100%'
        },
        card: {
            width: '100%',
        }
    }
}));
