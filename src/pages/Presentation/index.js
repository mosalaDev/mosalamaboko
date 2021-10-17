import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Typography, Button, makeStyles, Box, CircularProgress, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import logo from '../../assets/logo.png';
import banner from '../../assets/small-banner.png';
import TextInput from '../../components/Inputs/TextInput';
import axios from '../../config/axios';
import jwt_decode from 'jwt-decode';

export default function Presentation() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState(localStorage.getItem('rec'));
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState(null);
    const [exist, setExist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleEmailChange = (e) => {
        const val = e.target.value;
        if (decoded) {
            if (val === decoded.data.id) {
                setExist(true);
            } else {
                setExist(false);
            }
        }
        setEmail(val);
    };

    const handleClose = () => {
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setError("Mauvais address mail");
            return;
        }

        if (exist) {
            return;
        }

        setLoading(true);
        axios
            .post('/email_registry', { email })
            .then(response => {
                const res = response.data;
                if (res.status === 'success') {
                    localStorage.setItem('rec', res.token);
                    setToken(token);
                    setError(null);
                    setSaved(true);
                    setEmail('');
                } else {
                    setError(res.message);
                }
            })
            .catch(err => {
                setError("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer plus tard.");
                console.log(err.message);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (token && token !== '') {
            const dec = jwt_decode(token);
            setDecoded(dec);
        }
    }, [token]);

    useEffect(() => {
        if (email === '') {
            setError(null);
            setExist(false);
        }
    }, [email]);
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, "presentation")}>
            <div className={clsx(classes.container)}>
                <Typography variant="h1" className={classes.smallTitle}>Mosala Maboko</Typography>
                <Typography variant="h2" className={classes.title}>Arrive bientôt</Typography>
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <div className="logo-container">
                        <img src={logo} alt="mosala maboko" />
                    </div>
                    <Typography variant="body1" style={{ marginTop: 15 }}>
                        Notre site web est en cours de construction et sera disponible dans quelques jours.<br />
                        Veuillez enregistrer votre adresse email pour être notifié quand tout sera disponible.
                    </Typography>
                    <form className={classes.form}>
                        {error && <Alert severity="error" color="error" style={{ marginBottom: 10, textAlign: 'left', borderRadius: 0 }}>{error}</Alert>}
                        <Box display="flex" justifyContent="space-between" alignItems="top">
                            <TextInput
                                name="email"
                                id="email"
                                placeholder="Votre adresse mail"
                                value={email}
                                fullWidth
                                onChange={handleEmailChange}
                                style={{ flex: 1, marginRight: 10 }}
                                helperText={exist ? "C'est email est déjà enregistré." : ""}
                                error={exist ? true : false}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                className="btn"
                                disableElevation
                                style={{ marginTop: 10, padding: '8px 16px' }}
                                onClick={handleSubmit}
                            >
                                Enregistrer
                                {loading && <CircularProgress color="inherit" size={10} style={{ marginLeft: 10 }} />}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </div>
            <div className={classes.banner}>
                <img src={banner} alt="banner" />
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={saved}
                autoHideDuration={8000}
                onClose={handleClose}
                message="Adresse mail enregistrée avec succès!"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100vh'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 15px',
        boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        maxWidth: 400,
        backgroundColor: '#ffffffc9',
        backdropFilter: 'blur(10px)'
    },
    title: {
        fontSize: '2.5rem!important',
        fontFamily: 'Ephesis, cursive',
        color: theme.palette.secondary.main,
        fontWeight: '500!important'
    },
    smallTitle: {
        fontSize: '0.7rem!important',
        marginBottom: 15,
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        fontWeight: '500!important'
    },
    form: {
        width: '100%',
        marginTop: 15
    },
    banner: {
        width: 450
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            backgroundSize: 'cover',
            backgroundPosition: 'top'
        },
        banner: {
            display: 'none'
        }
    },
    [theme.breakpoints.down('xs')]: {
        container: {
            width: '95%',
            boxShadow: '0px 0px 4px rgb(0 0 0 / 15%)'
        },
    }
}));
