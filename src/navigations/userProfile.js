import React, { useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import '../pages/DashBoardPages/style.css';
import Typography from '@material-ui/core/Typography';
import { AppBar, Toolbar } from '@material-ui/core';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Profile, UserDevis, UserReservations, SingleReservation } from '../pages/DashBoardPages';
import { LoadingData, RightAside, SideBar } from '../components/DashBoard';
import { getReqStatus } from '../redux/reducers/user';
import { getUserReservations } from '../redux/reducers/reservations';
import { getUserDevis } from '../redux/reducers/devis';
import { IconButton } from '@material-ui/core';
import logo from '../assets/logo.png';

export default function ProfileNavigation() {
    const { path } = useRouteMatch();
    const [leftDrawerWidth, setLeftDrawerWidth] = useState(0);
    const [openRightAside, setOpenRightAside] = useState(false);
    const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
    const isLoadingUser = useSelector(getReqStatus) === 'loading';

    const toggleLeftDrawer = () => {
        if (leftDrawerWidth === 0) {
            setLeftDrawerWidth(200);
        } else {
            setLeftDrawerWidth(0);
        }
        setOpenLeftDrawer(!openLeftDrawer);
    };

    const toggleRighrAside = () => {
        setOpenRightAside(!openRightAside);
    };

    const dispatch = useDispatch();
    React.useEffect(() => {
        if (!isLoadingUser) {
            dispatch(getUserReservations());
            dispatch(getUserDevis());
        }
    }, [dispatch, isLoadingUser]);

    React.useEffect(() => {
        if (window.innerWidth >= 959.95) {
            setOpenLeftDrawer(true);
            setLeftDrawerWidth(200);
        }
    }, []);

    const useStyles = makeStyles(theme => ({
        root: {
            position: 'relative',
            display: 'flex',
            minHeight: '100vh'
        },
        contentContainer: {
            flexGrow: 1,
            maxWidth: 750,
            paddingBottom: 60,
            paddingTop: 70,
        },
        hideLogo: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            boxShadow: 'rgb(158 158 158 / 25%) 0px 1px 0px 0px'
        },
        appBarShift: {
            width: `calc(100% - ${leftDrawerWidth}px)`,
            marginLeft: leftDrawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            padding: '20px 0',
            color: '#565656',
            backgroundColor: '#f5f5f5',
        },
        logo: {
            width: 70
        },
    }));
    const classes = useStyles();
    return (
        <div className={clsx('dash-container', classes.root)}>
            {isLoadingUser ?
                <LoadingData /> :
                <>
                    <SideBar open={openLeftDrawer} handleClose={toggleLeftDrawer} />
                    <AppBar
                        position="fixed"
                        variant="elevation"
                        color="inherit"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: openLeftDrawer,
                        })}
                    >
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                onClick={toggleLeftDrawer}
                                style={{ marginLeft: -20 }}
                            >
                                {openLeftDrawer ? <CloseIcon /> : <MenuIcon />}
                            </IconButton>
                            <Link to="/">
                                <div className={clsx(classes.logo, { [classes.hideLogo]: openLeftDrawer })}>
                                    <img src={logo} alt="logo" />
                                </div>
                            </Link>
                            <IconButton className="stat-btn" onClick={toggleRighrAside} style={{ marginRight: -20 }}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.contentContainer}>
                        <Switch>
                            <Route axact path={`${path}/reservations/:reservationId`} component={SingleReservation} />
                            <Route axact path={`${path}/reservations`} component={UserReservations} />
                            <Route path={`${path}/devis`} component={UserDevis} />
                            <Route path={path} component={Profile} />
                        </Switch>
                    </div>
                    <RightAside open={openRightAside} handleClose={toggleRighrAside} />
                    <footer className={classes.footer}>
                        <Typography variant="body2">© mosala maboko</Typography>
                    </footer>
                </>
            }
        </div>
    )
}

