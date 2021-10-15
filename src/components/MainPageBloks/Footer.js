import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div className={classes.content}>
                <Link to="/aide" className={classes.helpLink}>Centre d&#39;aide</Link>
                <ul className={classes.links}>
                    <li className={classes.listItem}>
                        <Link to="/">FAQ</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Qui sommes nous ?</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Nous rejoindre</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Compte</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Charte qualité</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">C.G.U.S</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Confidentialité</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Mentions légales</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Contacts</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Espace techniciens</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to="/">Informations GHT</Link>
                    </li>
                </ul>
            </div>
            <div className={classes.copyRight}>
                <Typography style={{ fontSize: 15 }}>© Gifted Hands Technology. Tous droits reservés</Typography>
            </div>
        </div >
    )
}

const useStyles = makeStyles(theme => ({
    footer: {
        padding: '50px 0px 35px',
        position: 'relative',
        height: 'fit-content',
        backgroundColor: '#000000eb',
        color: '#b9b9b9'
    },
    content: {
        padding: '20px 40px',
        color: '#b9b9b9',
        maxWidth: 800,
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            padding: '70px 10px'
        },
    },
    helpLink: {
        marginBottom: '20px',
        display: 'inline-block',
        fontSize: '1.1rem',
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    links: {
        width: '100%'
    },
    contacts: {
        flex: 1
    },
    listItem: {
        marginBottom: 15,
        display: 'inline-block',
        verticalAlign: 'top',
        minWidth: 100,
        width: '23%',
        marginRight: 10,
        transition: '.2s',
        fontSize: 13,
        '& > a:hover': {
            color: theme.palette.common.white,
        },
        '& > a': {
            color: 'inherit',
        }
    },
    copyRight: {
        width: '100%',
        padding: 20,
        textAlign: 'center',
        color: '#ffffff7a',
    },
    [theme.breakpoints.down('sm')]: {
        links: {
            maxWidth: 580,
        },
        listItem: {
            width: '28%',
        }
    },
    [theme.breakpoints.down('xs')]: {
        links: {
            maxWidth: 325,
        },
        listItem: {
            width: '46%',
        }
    }
}));
