import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import { departements as services } from '../../customeFunctionalities/data';

const NextArrow = (props) => {
    const { style, onClick } = props;
    const classes = useStyles();
    return (
        <div
            className={`${classes.carButton} ${classes.nextArrow}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}>
            <ArrowForwardIos fontSize="large" color="inherit" />
        </div>
    );
};

const PrevArrow = (props) => {
    const { style, onClick } = props;
    const classes = useStyles();
    return (
        <div
            className={`${classes.carButton} ${classes.prevArrow}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}>
            <ArrowBackIos fontSize="large" color="inherit" />
        </div>
    );
};

export default function Services() {
    const carousselSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
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
                            <Slider {...carousselSettings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
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
                            </Slider>
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
        borderTop: '1px solid #bdbcbc96',
        borderBottom: '1px solid #bdbcbc96',
    },
    serviceCard: {
        flex: 1,
        textAlign: 'center',
        width: 200,
        minWidth: 200,
        height: 270,
        padding: '20px 10px',
        borderRight: '1px solid #bdbcbc96',
        display: 'flex!important',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: '50%',
        overflow: 'hidden',
    },
    cardBody: {
        marginTop: 10,
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
