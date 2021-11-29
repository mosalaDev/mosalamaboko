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
                            <Typography variant="body1" className={classes.text}>
                                Faites votre demande pour devenir un technicien <strong>mosala maboko</strong> et gagnez de l'argent en obtenant des marchés d'où vous vous trouvez.
                            </Typography>
                            <div className={clsx(classes.actions)}>
                                <Link to={`/devenir_technicien`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className="btn"
                                        disableElevation
                                    >Créer un compte technicien(e)</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '700!important',
        color: '#fff',
        marginBottom: '15px!important'
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        maxWidth: 500,
        color: '#fff',
        textAlign: 'right',
        alignItems: 'flex-end',
        [theme.breakpoints.down('sm').replace('959.95px', '840px')]: {
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    text: {
        fontSize: "18px!important",
        maxWidth: 430
    },
    actions: {
        maxWidth: 256,
        marginTop: 20,
    },
}))
