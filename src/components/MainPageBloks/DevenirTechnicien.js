import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { GAEventButton } from '..';

export default function DevenirTechnicien() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className="container">
                <div className="inner-content">
                    <div className={classes.container}>
                        <div className={classes.content}>
                            <Typography className={`${classes.title} big-title`}>Devenir un technicien(ne)</Typography>
                            <Typography variant="body1" className={classes.text}>
                                Faites votre demande pour devenir un(e) technicien(e) <strong>mosala maboko</strong> et gagner de l'argent en obtenant des marchés d'où vous vous trouvez.
                            </Typography>
                            <div className={clsx(classes.actions)}>
                                <Link to={`/devenir_technicien`}>
                                    <GAEventButton
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className="btn"
                                        disableElevation
                                        category="technicien"
                                        action="Devenir un technicien"
                                        label="Création du compte technicien"
                                    >Créer un compte technicien(e)</GAEventButton>
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
        maxWidth: 300,
        marginTop: 20,
    },
}))
