import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import './login.css';
import logo from '../../assets/logo.png';
import { LoginForm } from '../../components';

export default function Login() {
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
