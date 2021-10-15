import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import clsx from 'clsx';
import './style.css';
import { Avatar, Typography, useTheme } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import axios from '../../config/axios';
import { getServiceImage } from '../../customeFunctionalities/data';
import { LoadingData, NoData } from '.';
import Alert from '@material-ui/lab/Alert';

export default function TechniciensList() {
    const { url } = useRouteMatch();
    const [filter, setFilter] = useState('all');
    const [techniciens, setTechniciens] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const theme = useTheme();

    const handleFilterChange = (f) => {
        setFilter(f);
    };

    useEffect(() => {
        setLoading(true);
        axios.get('/api/artisan')
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setError(d.message);
                } else {
                    setTechniciens(d);
                }
            })
            .catch(err => {
                setError("Erreur: erreur du serveur.");
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <div className="inner-technicien">
            <header>
                <Typography variant="h2" className="tech-title">Techniciens</Typography>
                <div className="filters">
                    <ul className="tabs">
                        <li className={clsx("tab", { "active-tab": filter === 'all' })} onClick={() => handleFilterChange('all')}>Tous</li>
                        <li className={clsx("tab", { "active-tab": filter === 'actifs' })} onClick={() => handleFilterChange('actifs')}>Actifs</li>
                        <li className={clsx("tab", { "active-tab": filter === 'inactifs' })} onClick={() => handleFilterChange('inactifs')}>Inactifs</li>
                        <li className={clsx("tab", { "active-tab": filter === 'affecté' })} onClick={() => handleFilterChange('affecté')}>Affectés</li>
                        <li className={clsx("tab", { "active-tab": filter === 'disponible' })} onClick={() => handleFilterChange('disponible')}>Disponibles</li>
                    </ul>
                </div>
            </header>
            <div className="body-content">
                {error && <Alert variant="standard" color="info" severity="info">{error}</Alert>}
                {loading ?
                    <LoadingData /> :
                    techniciens.length === 0 ?
                        <NoData /> :
                        <div className="tech-list">
                            {techniciens.map(tech => (
                                <Link to={`${url}/${tech.id}`} key={tech.id} className="tech-card">
                                    <span>
                                        <Avatar style={{ backgroundColor: '#0230ff8c', color: "#fff", marginRight: 15 }} >
                                            {tech.user.prenom[0]}
                                        </Avatar>
                                        <Typography>{tech.user.prenom} {tech.user.nom}</Typography>
                                    </span>
                                    <span className="etat" style={{ backgroundColor: fade(tech.etat === 'actif' ? theme.palette.primary.main : theme.palette.secondary.main, 0.1), color: tech.etat === 'actif' ? theme.palette.primary.main : theme.palette.secondary.main }}>
                                        <Typography variant="caption" style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{tech.etat}</Typography>
                                    </span>
                                    <span>
                                        <img src={getServiceImage(tech.service.nom_service)} alt={tech.service.nom_service} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}
