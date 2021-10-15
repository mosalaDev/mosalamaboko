import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { makeStyles, Typography } from '@material-ui/core';
import TelVerification from './TelVerification';
import NewPassword from './NewPassword';

export default function PasswordRecovery() {
    const { path } = useRouteMatch();
    const token = localStorage.getItem("resset_token");
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                <header className={classes.header}>
                    <div className="logo-container">
                        <img src={logo} alt="logo" />
                    </div>
                    <Typography variant="h1" className={classes.title}>Recouvrement de mot de passe</Typography>
                </header>
                <form className={classes.content}>
                    <Switch>
                        <Route
                            path={`${path}/nouveau`}
                            render={() => {
                                if (!token || token === "") {
                                    return <Redirect to={path} />
                                }

                                return (
                                    <NewPassword />
                                )
                            }}
                        />
                        <Route
                            path={path}
                            component={TelVerification}
                        />
                    </Switch>
                </form>
            </div>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fbfbfb'
    },
    innerContainer: {
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20
    },
    title: {
        fontSize: '22px!important',
        margin: '15px 0'
    },
    content: {
        backgroundColor: '#fff',
        padding: 20,
        boxShadow: '0px 0px 2px 0px #c5c5c5'
    },
    [theme.breakpoints.down('xs')]: {
        content: {
            width: '95%',
            margin: 'auto',
        }
    }
}));
