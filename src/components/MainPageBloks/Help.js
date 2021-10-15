import React from 'react';
import './styles.css';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';
import { helpContents } from '../../customeFunctionalities/data';

export default function Help() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h4" className={classes.title}>Commencez dès maintenant</Typography>
            </div>
            <div className={clsx(classes.helpCardList, 'help-card-list')}>
                {helpContents.map((hc, index) => (
                    <div key={`${hc.badge}_${index}`} className={clsx(classes.helpCard, 'help-card')}>
                        <div className={classes.innerCard}>
                            <div className={`${classes.cardBlock} ${classes.cardHeader}`}>
                                <img src={hc.image} alt={hc.title} />
                            </div>
                            <div className={`${classes.cardBlock} ${classes.cardBody}`}>
                                <span className={classes.cardBadge}>{hc.badge}</span>
                                <div>
                                    <span className={classes.cardTitle}>{hc.title}</span>
                                    <p className={classes.cardText}>{hc.body}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        padding: '0 20px 30px 20px',
        textAlign: 'center',
    },
    title: {
        fontSize: 37,
        color: '#283d71',
    },
    exp: {
        fontSize: 18,
    },
    helpCardList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    helpCard: {
        backgroundColor: '#fbfbfb',
        color: '#444',
        width: '100%',
        padding: '40px 45px',
        '&:not(:last-child)': {
            marginBottom: 10,
        },
        "&:nth-child(2n) > div": {
            flexDirection: 'row-reverse'
        }
    },
    innerCard: {
        display: 'flex',
        alignItems: 'center',
        maxWidth: 1100,
        margin: 'auto',
    },
    cardBlock: {
        flex: 1,
        padding: 20
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5px 0'
    },
    cardBadge: {
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        minWidth: 35,
        height: 35,
        border: '2px solid #9a93ffa6',
        color: '#9a93ffa6',
        backgroundColor: '#ebc30512',
        fontWeight: 600
    },
    cardTitle: {
        fontWeight: 600,
        fontSize: 23,
        marginBottom: 10,
        marginTop: '-6px',
        display: 'block',
    },
    cardBody: {
        fontWeight: 'lighter',
        fontSize: 17,
        display: 'flex',
        alignItems: 'flex-start',
    },
    cardText: {
        fontSize: 20,
    },
    [theme.breakpoints.down('sm').replace('959.95px', '810px')]: {
        title: {
            fontSize: 30
        },
        helpCard: {
            padding: '20px 10px'
        },
        innerCard: {
            flexDirection: 'column!important',
        },
        cardBody: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        cardTitle: {
            fontSize: 20,
            marginTop: 10
        },
        cardText: {
            fontSize: '17px!important'
        }
    },
    [theme.breakpoints.down('sm')]: {
        title: {
            fontSize: 23,
        }
    }
}));
