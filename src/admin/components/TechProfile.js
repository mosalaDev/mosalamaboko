import { Avatar, Button, CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';
import { LoadingData } from '.';

export default function TechProfile() {
    const params = useParams();
    const [technicien, setTechnicien] = useState();
    const [loading, setLoading] = useState(false);
    const [activating, setActivating] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('affectations');
    const [more, setMore] = useState(false);

    const formatExperience = (annee_debut) => {
        const exp = (new Date()).getFullYear() - annee_debut;
        if (exp <= 1) {
            return `0 à 1an`;
        }

        return `${exp}ans`;
    };

    const toggleMoreData = () => {
        setMore(m => !m);
    };

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    const toggleActivation = () => {
        const end = technicien.etat === 'actif' ? 'desactivate' : 'activate';
        axios
            .post(`/api/artisan/${technicien.id}/${end}`)
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setError(d.message);
                } else {
                    setTechnicien(d.artisan);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { });
    };

    useEffect(() => {
        axios
            .get('/api/artisan/' + params.artisanId)
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setError(d.message);
                } else {
                    setTechnicien(d);
                    setError(null);
                }
            })
            .catch(err => {
                setError("Erreur: erreur du serveur");
            })
            .finally(() => setLoading(false));
    }, [params.artisanId]);

    const classes = useStyles();
    return (
        <div className="inner-tech-profile">
            {error && <Alert severity="info" color="infor">{error}</Alert>}
            {(loading || !technicien) ?
                <LoadingData /> :
                <div className="profile-content">
                    <div>
                        <Avatar className="tech-avatar">{technicien.user.prenom[0]}</Avatar>
                    </div>
                    <div>
                        <div className="tech-data">
                            <Typography className="data-item nom" variant="body2">{technicien.user.prenom} {technicien.user.nom}</Typography>
                            <Typography className="data-item" variant="body2">Spécialisé en {technicien.service.nom_service}</Typography>
                            <Typography className="data-item" variant="body2">Experience: <span className="value">{formatExperience(technicien.debut_experience)}</span></Typography>
                            <Typography className="data-item" variant="body2">Etat: <span className="value">{technicien.etat}</span></Typography>
                            <div className={clsx("more-data", {
                                [classes.hide]: !more
                            })}>
                                <Typography className="data-item" variant="body2">Tranche d'âge: {technicien.tranche_age}</Typography>
                                <Typography className="data-item" variant="body2">{technicien.organisation}</Typography>
                                <div className="data-group">
                                    <Typography className="group-title">Addresse du travail</Typography>
                                    <Typography className="data-item" variant="body2">{technicien.zone.nom}</Typography>
                                </div>
                                <Typography className="data-item" variant="body2">{technicien.adresse_travail}</Typography>
                                <Typography className="data-item" variant="body2">{technicien.formateur}</Typography>
                            </div>
                            <Button
                                className={clsx("btn")}
                                variant="contained"
                                color="default"
                                size="small"
                                disableElevation
                                onClick={toggleMoreData}
                            >
                                {more ? 'Moins' : 'Plus'}
                            </Button>
                            <div className="tech-actions">
                                <Button
                                    className="btn"
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    disableElevation
                                    onClick={toggleActivation}
                                >
                                    {technicien.etat === 'actif' ? 'Desactiver' : 'Activer'}
                                    {activating && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                </Button>
                                <Button
                                    className="btn"
                                    variant="text"
                                    color="secondary"
                                    disableElevation
                                    size="small"
                                >
                                    Supprimer
                                </Button>

                            </div>
                        </div>
                        <div>
                            <div className="filters">
                                <ul className="tabs">
                                    <li className={clsx("tab", { "active-tab": filter === 'affectations' })} onClick={() => handleFilterChange('affectations')}>Affectations</li>
                                    <li className={clsx("tab", { "active-tab": filter === 'prestations' })} onClick={() => handleFilterChange('prestations')}>Prestations</li>
                                    <li className={clsx("tab", { "active-tab": filter === 'cotes' })} onClick={() => handleFilterChange('cotes')}>Cotes</li>
                                </ul>
                            </div>
                            <div>
                                {filter}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const useStyles = makeStyles({
    hide: {
        height: 0,
        visibility: 'hidden',
        opacity: 0
    }
});