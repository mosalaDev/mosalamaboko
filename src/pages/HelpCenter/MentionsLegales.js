import React from 'react';
import clsx from 'clsx';
import {Typography, makeStyles} from '@material-ui/core';

export default function MotionLegale() {
    const classes = useStyles();
    return (
        <div className={clsx("page-root", classes.root)}>
            <header className={classes.header}>
                <div className={classes.headerContent}>
                    <Typography variant="h1" className="big-title">Mentions légales</Typography>
                </div>
            </header>
            <section className={classes.mainContent}>
                <Typography>
                    La société Gifted hands technology SARL, société à responsabilité limitée au capital 1000000 CDF, immatriculée au registre de commerce et du crédit mobilier, Antenne de GUCE Kinshasa/ Gombe, sous le numéro CD/KNG/RCCM/21-B-02901 dont le siège social est situé à Av. De la Douane, Concession SCTP Bâtiment à gauche, Quartier de la Gare, Commune de la Gombe, KINSHASA. Travaillant sur le site internet <a href="https://www.mosalamaboko.com/">www.mosalamaboko.com</a>. <br/>La société Gifted hands technology est représentée par son gérant KANKU KATALAYI Elisée.
                </Typography>
            </section>
            <div className={classes.footer}>
                <div>
                    <Typography className={classes.contactText} style={{ fontSize: 15, textAlign: 'center' }}>Pour d'autres questions écrivez-nous au <a href="tel:+243906054917">+243 906 054 917</a></Typography>
                </div>
                <div>
                    <Typography style={{ fontSize: 15, textAlign: 'center' }}>© Gifted Hands Technology. Tous droits reservés</Typography>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
    },
    header: {
        padding: '50px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #eaeaea',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 500,
    },
    mainContent: {
        maxWidth: 600,
        margin: 'auto',
        padding: "20px 0",
        "& > p": {
            fontSize: 22,
            textAlign: 'justify'
        }
    },
    footer: {
        borderTop: '1px solid #eaeaea',
        "& > div": {
            padding: '20px 30px',
        }
    },
});