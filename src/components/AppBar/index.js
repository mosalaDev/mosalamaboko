import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './appBar.css';
import logo from '../../assets/logo.png';
import { Button, Typography, Hidden, makeStyles, useMediaQuery } from '@material-ui/core';
import { getUser, getConnectionState } from '../../redux/reducers/user';
import UserMenu from './UserMenu';

export default function AppBar() {
    const [shadow, setShadow] = useState(false);
    const history = useHistory();
    const user = useSelector(getUser);
    const isConnected = useSelector(getConnectionState);

    const matches = useMediaQuery('(max-width:600px)');

    const goToReservation = () => {
        history.push('/reservation');
    };

    const goToConnection = () => {
        history.push('/connexion');
    };

    window.addEventListener('scroll', () => {
        const scY = window.scrollY;
        if (scY > 0) {
            setShadow(true);
        } else {
            setShadow(false);
        }
    });

    const classes = useStyles();
    return (
        <div className="appbar" style={{ backgroundColor: shadow ? '#ffffff9c' : '#fff', boxShadow: shadow ? 'rgb(158 158 158 / 25%) 0px 1px 6px 0px' : 'rgb(158 158 158 / 25%) 0px 1px 0px 0px' }}>
            <div className="container">
                <div className="inner-content inner-appbar">
                    <Link to="/" style={{ display: 'block', margin: '0 10px 0 5px' }}>
                        <div className="logo" style={{ height: '100%' }}>
                            <div className="logo-image">
                                <img src={logo} alt="logo" />
                            </div>
                            <Typography variant="h1" color="primary" className="logo-string">Mosala maboko</Typography>
                        </div>
                    </Link>
                    <div className="connexion">
                        <Button
                            className="btn reserv"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={goToReservation}
                        >
                            Reserver<Hidden xsDown> une prestation</Hidden>
                        </Button>
                        {
                            isConnected ?
                                <UserMenu user={user} /> :
                                <Button
                                    className="btn"
                                    variant={matches ? "text" : 'contained'}
                                    disableElevation
                                    color="secondary"
                                    onClick={goToConnection}
                                >Connexion</Button>
                        }
                    </div>
                </div>
            </div>
            <Hidden smUp>
                <div className={classes.responsiveNav}>

                </div>
            </Hidden>
        </div >
    )
}

const useStyles = makeStyles(theme => ({
    container: {

    }
}));
