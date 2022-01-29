import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Typography, makeStyles, Box, Divider } from '@material-ui/core';
import {Facebook, Instagram, LinkedIn} from '@material-ui/icons';
import logo from '../../assets/logo.png';
import banner from '../../assets/small-banner.png';
import ReactGA from 'react-ga';
import { gaEvent } from '../../customeFunctionalities/reactGa';

export default function Presentation() {
    const handleScialClick = (name) => {
        gaEvent(`go to ${name}`, 'social link clicked', 'link');
    }

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, "presentation")}>
            <div className={clsx(classes.container)}>
                <Typography variant="h1" className={classes.smallTitle}>Mosala Maboko</Typography>
                <Typography variant="h2" className={classes.title}>Maintenance</Typography>
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <div className="logo-container">
                        <img src={logo} alt="mosala maboko" />
                    </div>
                    <Divider />
                    <Typography variant="body1" style={{ marginTop: 20 }}>
                        Chers clients, 
                        <br/>dans le but d'améliorer ses performances, 
                        <br/>notre site est temporairement indisponible en raison d'activités de maintenance planifiées. 
                        <br/>Le site sera de nouveau disponible dans quelques heures.
                    </Typography>
                    <div className={classes.socialContainer}>
                        <Typography>Suivez-nous sur les réseaux sociaux pour avoir des nouvelles.</Typography>
                        <div>
                            <a href="https://www.linkedin.com/company/mosala-maboko" target="blank" onClick={() => handleScialClick("linkedin")} className={classes.social}>
                                <LinkedIn htmlColor="#007bb5" fontSize="large" className={classes.socialIcon} />
                            </a>
                            <a href="https://facebook.com/mosalamaboko2021" target="blank" onClick={() => handleScialClick("facebook")} className={classes.social}>
                                <Facebook htmlColor="#3b5998" fontSize="large" className={classes.socialIcon} />
                            </a>
                            <a href="https://www.instagram.com/mosalamaboko" target="blank" onClick={() => handleScialClick("instagram")} className={classes.social}>
                                <Instagram htmlColor="#E4405F" fontSize="large" className={classes.socialIcon} />
                            </a>
                        </div>
                    </div>
                    <Typography style={{marginTop: 10}}>Merci pour votre compréhension !</Typography>
                </Box>
            </div>
            <div className={classes.banner}>
                <img src={banner} alt="banner" />
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100vh'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        maxWidth: 400,
        backgroundColor: '#ffffff',
        backdropFilter: 'blur(10px)'
    },
    title: {
        fontSize: '1.5rem!important',
        color: theme.palette.secondary.main,
        textTransform: 'uppercase',
        fontWeight: '500!important'
    },
    smallTitle: {
        fontSize: '0.7rem!important',
        marginBottom: 15,
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        fontWeight: '500!important'
    },
    socialContainer: {
        display: 'flex',
        padding: '15px 0',
        justifyContent: 'center',
        flexDirection: 'column',
        "& > div": {
            paddingTop: 10,
            display: 'inherit',
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    social: {
        "&:not(:last-child)": {
            marginRight: 10
        }
    },
    form: {
        width: '100%',
        marginTop: 15
    },
    banner: {
        width: 450
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            backgroundSize: 'cover',
            backgroundPosition: 'top'
        },
        banner: {
            display: 'none'
        }
    },
    [theme.breakpoints.down('xs')]: {
        container: {
            width: '95%',
        },
    }
}));
