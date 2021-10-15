import React, {useEffect} from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import { HelpCenterHome } from '../pages';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import logo from '../assets/logo.png';
import '../pages/HelpCenter/style.css';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fbfbfb',
        minWidth: '100vw',
        minHeight: '100vh',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: 'rgb(158 158 158 / 25%) 0px 1px 0px 0px'
    },
    toolbar: {
        justifyContent: 'space-between',
        color: '#666',
    },
    title: {
        fontSize: 17,
        fontWeight: 600,
        color: 'inherit'
    },
    logo: {
        width: 70
    },
}));
export default function HelpCenterNavigation() {
    const { path } = useRouteMatch();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                variant="elevation"
                color="inherit"
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Link to="/aide" className={classes.title}>Centre d'aide</Link>
                    <Link to="/">
                        <div className={classes.logo}>
                            <img src={logo} alt="logo" />
                        </div>
                    </Link>

                </Toolbar>
            </AppBar>
            <Switch>
                <Route path={`${path}`} component={HelpCenterHome} />
            </Switch>
        </div>
    );
}