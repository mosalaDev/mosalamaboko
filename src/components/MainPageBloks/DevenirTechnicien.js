import React from 'react';
import clsx from 'clsx';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles, Typography, Button } from '@material-ui/core';
import hat from '../../assets/hat.svg';

export default function DevenirTechnicien() {
    const { url } = useRouteMatch();
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className="container">
                <div className="inner-content">
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <Typography className={`${classes.title} big-title`}>Devenir un technicien(ne)</Typography>
                            <Typography variant="body1" className="second-text">
                                Faites votre demande pour devenir un technicien <strong>mosala maboko</strong> et gagnez de l'argent en obtenant des marchés d'où vous vous trouvez.
                            </Typography>
                            <div className={clsx(classes.actions)}>
                                <Link to={`/devenir_technicien`}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className="btn"
                                        disableElevation
                                    >Créer un compte technicien</Button>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.hat}>
                            <img src={hat} alt="hat" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '400!important',
        color: '#283d71',
        marginBottom: '15px!important'
    },
    container: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 20,
        alignItems: 'center',
        maxWidth: 960,
        margin: 'auto',
        [theme.breakpoints.down('sm').replace('959.95px', '840px')]: {
            gridTemplateColumns: '1fr',
            flexDirection: 'column-reverse',
            justifyItems: 'center',
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 900,
        margin: 'auto',
        [theme.breakpoints.down('sm').replace('959.95px', '840px')]: {
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    actions: {
        maxWidth: 256,
        marginTop: 20,
    },
    hat: {
        maxWidth: 311,
        [theme.breakpoints.down('sm').replace('959.95px', '840px')]: {
            maxWidth: 190,
            gridRowStart: 1,
        }
    }
}))
