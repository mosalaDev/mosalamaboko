import React from 'react';
import { Typography, makeStyles, fade } from '@material-ui/core';

import { usualWorks } from '../../customeFunctionalities/data';

export default function UsualWorks() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant="h5" className={`${classes.title} big-title`}>Quelques pannes courantes</Typography>
                <Typography variant="body1" className={`${classes.exp} second-text`}>Avez-vous l'un de ces problèmes ? selectionnez-le et trouvez un technicien fiable!</Typography>
            </div>
            <div className={classes.uWCardList}>
                {usualWorks.map((uw, index) => (
                    <div key={`${uw.id}_${index}`} className={classes.uWCard}>
                        <div className={classes.cardBody}>
                            <p className={classes.cardTitle}>{uw.title}</p>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingBottom: '40px',
        textAlign: 'center',
    },
    uWCardList: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gap: 15,
        color: '#444',
    },
    uWCard: {
        padding: '7px 20px',
        borderRadius: 3,
        border: '1px solid #d6d6d6',
        textAlign: 'center',
        cursor: 'pointer',
        transition: '.2s',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: fade(theme.palette.grey[300], 0.3),
            color: theme.palette.secondary.main,
        }
    },
    title: {
        margin: '0 0 20px 0',
        color: '#283d71',
        fontWeight: '400!important'
    },
    cardTitle: {
        textTransform: 'capitalize',
        fontSize: 17,
    },
    [theme.breakpoints.down('sm')]: {
        uWCardList: {
            gridTemplateColumns: 'auto',
            gap: 5
        },
    }

}));
