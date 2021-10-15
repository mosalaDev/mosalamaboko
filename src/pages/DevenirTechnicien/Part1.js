import React, { useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Person } from '@material-ui/icons';
import { getUser, getConnectionState } from '../../redux/reducers/user';
import { LoginForm } from '../../components';
import axios from '../../config/axios';

export default function Part1() {
    const user = useSelector(getUser);
    const isConnected = useSelector(getConnectionState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { url } = useRouteMatch();
    const history = useHistory();
    const handleGoNext = () => {
        setLoading(true);
        axios
            .get(`/technicien/by_username/${user.username}`)
            .then(res => {
                const d = res.data;
                if (d.code) {
                    if (d.code === 'artisan/not_exist') {
                        history.push("2");
                    } else {
                        setError(d.message);
                    }
                } else {
                    let message = "";
                    if (d.etat === 'actif') {
                        message = "Le compte d'utilisateur selectionné a déjà un compte technicien. Veuillez utiliser un autre compte.";
                    } else {
                        message = "La demande pour ce compte d'utilisateur est encours de traitement. Nous allons bientôt vous appeler.";
                    }
                    setError(message);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { setLoading(false); });
    };

    if (!isConnected) {
        return (
            <div className="step user-confirm">
                <LoginForm successUrl={url} createAccountLink="/créer_compte" />
            </div>
        )
    }

    return (
        <div className="step user-confirm">
            <div className="step1">
                <Typography variant="h5" className="step-title"><span>Etape 1.</span><span>Confirmer votre compte utilisateur</span></Typography>
                {error &&
                    <Alert severity="error" color="error" variant="standard" style={{ marginBottom: 10 }}>{error}</Alert>
                }
                <Typography variant="body1">Voulez vous utiliser le compte suivant dans la création d'un compte technicien ?</Typography>
                <div className="account-card">
                    <Person htmlColor="#2340c1" />
                    <Typography>{user.prenom} {user.nom}</Typography>
                </div>
                <Typography variant="caption" style={{ color: '#666', textAlign: 'justify' }}>
                    En cliquant sur <strong>oui, continuer</strong> vous acceptez les <Link to="#" style={{ color: "#FF7A00" }}>conditions d'utilisation</Link> de mosala maboko
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className="btn"
                        onClick={handleGoNext}
                        disableElevation
                        size="small"
                    >
                        Oui, continuer
                        {loading && <CircularProgress color="inherit" size={10} style={{ marginLeft: 10 }} />}
                    </Button>
                </div>
            </div>
        </div>
    )
}
