import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons';

export default function Contacts({ contactRef }) {
    const classes = useStyles();
    return (
        <div className={classes.container} id="contacts" ref={contactRef}>
            <div className="container">
                <div className="inner-content">
                    <div className={classes.content}>
                        <div className={classes.contactList}>
                            <div className={classes.card}>
                                <Typography variant="h6" className={classes.cardTitle}>Réseau sociaux</Typography>
                                <div className={classes.body}>
                                    <Link to="/">
                                        <IconButton className={classes.facebook}>
                                            <Facebook fontSize="small" />
                                        </IconButton>
                                    </Link>
                                    <Link to="/">
                                        <IconButton className={classes.twitter}>
                                            <Twitter fontSize="small" />
                                        </IconButton>
                                    </Link>
                                    <Link to="/">
                                        <IconButton className={classes.instagram}>
                                            <Instagram fontSize="small" />
                                        </IconButton>
                                    </Link>
                                    <Link to="/">
                                        <IconButton className={classes.linkedIn}>
                                            <LinkedIn fontSize="small" />
                                        </IconButton>
                                    </Link>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <Typography variant="h6" className={classes.cardTitle}>Email</Typography>
                                <div className={classes.body}>
                                    <Typography variant="body1" color="inherit" className={classes.bodyText}>contact@mosalamaboko.com</Typography>
                                </div>
                            </div>
                            <div className={classes.card}>
                                <Typography variant="h6" className={classes.cardTitle}>Appel d'urgence</Typography>
                                <div className={classes.body}>
                                    <Typography variant="body1" color="inherit" className={classes.bodyText}>+243906054917</Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    content: {
        padding: '50px 0 0',
    },
    contactList: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    card: {
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 77,
        '&:not(:last-child)': {
            marginRight: 50,
        }
    },
    cardTitle: {
        fontSize: '14px!important',
        fontWeight: '600!important',
        color: '#fff',
    },
    body: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '10px 0',
        color: 'inherit',
        '& > a': {
            marginRight: 10
        }
    },
    bodyText: {
        fontSize: 15,
    },
    facebook: {
        backgroundColor: '#1877F2',
        color: '#fff',
        width: 40,
        height: 40,
        '&:hover': {
            backgroundColor: '#0757bd',
        }
    },
    instagram: {
        backgroundColor: '#E4405F',
        color: '#fff',
        width: 40,
        height: 40,
        '&:hover': {
            backgroundColor: '#b91634',
        }
    },
    twitter: {
        width: 40,
        height: 40,
        backgroundColor: '#1DA1F2',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#1179b9',
        }
    },
    linkedIn: {
        backgroundColor: '#0A66C2',
        color: '#fff',
        width: 40,
        height: 40,
        '&:hover': {
            backgroundColor: '#2487c3',
        }
    },
    [theme.breakpoints.down('sm')]: {
        contactList: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            "& > div:not(:last-child)": {
                marginRight: 0,
                textAlign: 'inherit',
                marginBottom: 15,
            }
        },
        card: {
            minHeight: 'fit-content',
            "&:first-child > h6": {
                marginBottom: 10,
            }
        },
        body: {
            padding: 0,
        }
    }
}));

