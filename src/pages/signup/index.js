import React, {useEffect} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './signUp.css';
import logo from '../../assets/logo.png';
import { Typography, Button } from '@material-ui/core';
import { PersonOutline, History, FeedbackOutlined, FlightTakeoff } from '@material-ui/icons';
import { SignupForm } from '../../components';
import ReactGA from 'react-ga';

export default function Signup() {
    const { url } = useRouteMatch();
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    return (
        <div className="signup">
            <div className="header">
                <div className="top-header space-bt-flex-content">
                    <Link to="/" className="logo-container">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="space-bt-flex-content">
                        <Typography variant="body2" style={{ marginRight: 5 }}>Vous avez déjà un compte?</Typography>
                        <Link to={`${url.replace('créer_compte', '')}connexion`}>
                            <Button
                                variant="text"
                                color="primary"
                                className="btn"
                                size="large"
                                disableElevation
                            >
                                Connecter
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Typography variant="h1" className="main-title">Créez un compte, <br />accédez à toutes les fonctionalités.</Typography>
            <div className="signup-content center-flex-row-content">
                <div className="description">
                    <div className="description-card">
                        <div className="description-card-header align-start-flex-row-content">
                            <PersonOutline color="primary" className="card-icon" />
                            <Typography variant="h5" className="description-card-title">Céation gratuite</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'justify' }}>La création d'un compte mosala maboko est gratuite.</Typography>
                    </div>
                    <div className="description-card">
                        <div className="description-card-header align-start-flex-row-content">
                            <History color="primary" className="card-icon" />
                            <Typography variant="h5" className="description-card-title">Accès à l'historique</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'justify' }}>Vous aurez l'avantage d'accéder à l'historique de vos transactions avec mosala maboko.</Typography>
                    </div>
                    <div className="description-card">
                        <div className="description-card-header align-start-flex-row-content">
                            <FeedbackOutlined color="primary" className="card-icon" />
                            <Typography variant="h5" className="description-card-title">Communication</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'justify' }} > Il sera facile de communiquer avec mosala maboko et quelques fois de modifier vos reservations avant la prestation.</Typography>
                    </div>
                    <div className="description-card">
                        <div className="description-card-header align-start-flex-row-content">
                            <FlightTakeoff color="primary" className="card-icon" />
                            <Typography variant="h5" className="description-card-title">Rapidité</Typography>
                        </div>
                        <Typography variant="body2" color="textSecondary" style={{ textAlign: 'justify' }}>Avec votre compte, la reservation sur mosala maboko devient rapide.</Typography>
                    </div>
                </div>
                <SignupForm />
            </div>
            <footer className="sign-footer">
                <Typography variant="body2">© Gifted Hands Technology</Typography>
            </footer>
        </div >
    )
}
