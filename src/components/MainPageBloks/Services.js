import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import other from '../../assets/repair_tool.png';

import { departements as services } from '../../customeFunctionalities/data';

export default function Services() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className="container">
                <div>
                    <div className={classes.innerContainer}>
                        <div className={classes.header}>
                            <div className={classes.titleContainer}>
                                <Typography variant="h5" className={`${classes.title} big-title`}>Nos services</Typography>
                            </div>
                        </div>
                        <div className={classes.serviceList}>
                            {services.map((service, index) => (
                                <div className={classes.serviceCard} key={`${service.name}_${index}`}>
                                    <div className={classes.cardHeader}>
                                        <div className={classes.imageContainer}>
                                            <img src={service.image} alt={service.name} className={classes.image} />
                                        </div>
                                    </div>
                                    <div className={classes.cardBody}>
                                        <Typography variant="body1" style={{ fontSize: 17 }}>{service.name}</Typography>
                                    </div>
                                </div>
                            ))}
                             <div className={classes.serviceCard}>
                                    <div className={classes.cardHeader}>
                                        <div className={classes.imageContainer} style={{backgroundColor: '#484848'}}>
                                            <img src={other} alt="autres services" className={classes.image} />
                                        </div>
                                    </div>
                                    <div className={classes.cardBody}>
                                        <Typography variant="body1" style={{ fontSize: 17 }}>Autres services</Typography>
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
    container: {
        backgroundColor: 'inherit',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: '0 20px 40px 20px',
    },
    title: {
        color: '#283d71',
        textAlign: 'center',
        fontWeight: '400!important',
    },
    logoContainer: {
        width: 95,
        height: 95,
        marginRight: 20,
    },
    serviceList: {
        display: 'grid',
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        alignContents: 'center',
        [theme.breakpoints.down('sm')]: {
			gridTemplateColumns: "1fr 1fr",
			justifyContent: 'center'
		}
    },
    serviceCard: {
        flex: 1,
        textAlign: 'center',
        padding: '20px 10px',
        display: 'flex!important',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 90,
        height: 90,
        borderRadius: '50%',
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            width: 50,
            height: 50,
        }
    },
    cardBody: {
        marginTop: 10,
        maxWidth: 160,
        '& *': {
            fontWeight: '700!important',
            color: 'inherit',
        },
    },
    carButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex!important',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 10,
        padding: 15,
        "&:hover": {
            backgroundColor: '#d2d2d217',
        }
    },
    nextArrow: {
        right: 0
    },
    prevArrow: {
        left: 0,
    },
    [theme.breakpoints.down('sm')]: {
        serviceCard: {
            height: 190
        }
    }
}));
