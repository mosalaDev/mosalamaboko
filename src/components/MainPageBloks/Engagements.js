import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import './styles.css';

export default function Engagements({ handleAskReservation }) {
    const classes = useStyles();
    return (
        <div className="container">
            <div className="inner-content">
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Typography className={`${classes.title} big-title`}>Notre engagement</Typography>
                        <Typography variant="body1" className="second-text">Pour un souci technique, la confiance est primordiale : un travail bien fait, manquant un retour négatif, même les jours avenirs. De ce fait, mosala maboko s’engage à mettre à la disposition du grand public des technicien(ne)s qualifié(e)s.</Typography>
                        <div className="actions">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                className="btn hero-btn"
                                onClick={handleAskReservation}
                            >Trouvez un technicien</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    container: {
        minHeight: '10vh',
        display: 'flex',
        alignItems: 'center',
        color: '#444',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: 900,
        margin: 'auto'
    },
    title: {
        marginBottom: 15,
        color: '#283d71',
        fontWeight: '400!important'
    }
});
