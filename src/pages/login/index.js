import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './login.css';
import logo from '../../assets/logo.png';
import { LoginForm } from '../../components';
import ReactGA from 'react-ga';

export default function Login() {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    return (
        <div className="login">
            <Link to="/" className="logo-container">
                <img src={logo} alt="logo" />
            </Link>
            <LoginForm />
            <footer className="sign-footer">
                <Typography variant="body2">© Gifted Hands Technology</Typography>
            </footer>
        </div>
    )
}
