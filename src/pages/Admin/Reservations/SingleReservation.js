import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography, Radio } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from '../../../config/axios';
import { formatDate } from '../../../customeFunctionalities/helpers';

export default function SingleReservation() {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState();
    const [travaux, setTravaux] = useState([]);
    const [loading, setLoading] = useState(true);
    const [technicien, setTechnicien] = useState();
    const [techniciens, setTechniciens] = useState([]);
    const [error, setError] = useState(null);
    const [affecting, setAffecting] = useState(false);

    const handleCreateAffectation = () => {
        if (technicien) {
            setAffecting(true);
            axios
                .post(`/api/affectation`, { reservation: reservation.id, artisan: technicien })
                .then(res => {
                    const d = res.data;
                    if (d.code) {
                        setError(d.message);
                    } else {
                        setReservation(reserv => ({ ...reserv, affectation: d }));
                    }
                })
                .catch(err => {
                    setError(err.message);
                })
                .finally(() => {
                    setAffecting(false);
                });
        }
    };

    const handleselectTech = (e) => {
        setTechnicien(e.target.value);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/api/reservation/${reservationId}`)
            .then(res => {
                const d = res.data;
                if (d.code) {
                    setError(d.message);
                } else {
                    setReservation(d.reservation);
                    setTravaux(d.travaux);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, [reservationId]);

    useEffect(() => {
        if (reservation) {
            if (!reservation.affectation) {
                axios
                    .get(`/api/reservation/${reservation.id}/artisan_qualifie`)
                    .then(res => {
                        const d = res.data;
                        if (d.code) {

                        } else {
                            setTechniciens(d);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => { });
            }
        }
    }, [reservation]);

    return (
        <>
            {loading ?
                <div>
                    <CircularProgress />
                </div> :
                <div className="single-res-container">
                    <div className="reservation">
                        <div className="reserv-header">
                            <Typography variant="h4">Reservation {reservation.service.nom_service}</Typography>
                            <Typography variant="caption" color="textSecondary">{formatDate(reservation.createdAt)}</Typography>
                        </div>
                        <div className="reserv-body">
                            <div>
                                <div className="reserv-data">
                                    <Typography variant="body1" className="data-title">Données du client</Typography>
                                    <Typography variant="body2"><span>Client:</span><span>{reservation.user.tel}</span></Typography>
                                    <Typography variant="body2"><span>Service:</span><span>{reservation.service.nom_service}</span></Typography>
                                </div>
                                <div className="reserv-data">
                                    <Typography variant="body1" className="data-title">Info sur la prestation</Typography>
                                    <Typography variant="body2"><span>Catégorie de travaux:</span><span>{travaux.length > 0 ? travaux[0].gamme.nom : 'Aucun travail'}</span></Typography>
                                    <Typography variant="body2"><span>Date des travaux:</span><span>{formatDate(reservation.date_w)}</span></Typography>
                                    <Typography variant="body1" className="data-small-title">Addresse de prestation</Typography>
                                    <Typography variant="body2"><span>Zone:</span><span>{reservation.zone.nom}</span></Typography>
                                    <Typography variant="body2"><span>Commune:</span><span>{reservation.commune}</span></Typography>
                                    <Typography variant="body2"><span>Quartier:</span><span>{reservation.quartier}</span></Typography>
                                    <Typography variant="body2"><span>Avenue:</span><span>{reservation.avenue}</span></Typography>
                                    <Typography variant="body2"><span>Numéro:</span><span>{reservation.numero}</span></Typography>
                                </div>
                                <div className="reserv-actions">
                                    <Button
                                        className="btn"
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        disableElevation
                                    >
                                        Valider la reservation
                                    </Button>
                                    <Button
                                        className="btn"
                                        variant="text"
                                        color="primary"
                                        size="small"
                                        disableElevation
                                    >
                                        Anuler
                                    </Button>
                                </div>
                            </div>
                            <div className="affectation">
                                {reservation.affectation ?
                                    <div>
                                        <Typography>Affectation</Typography>
                                    </div> :
                                    <div>
                                        <Typography variant="h4">Affectez un technicien</Typography>
                                        <ul className="tech-list">
                                            {techniciens.map(tech => (
                                                <li className="tech-item">
                                                    <label key={tech.id} htmlFor={tech.id} className="radio">
                                                        <Radio
                                                            type="radio"
                                                            color="primary"
                                                            checked={tech.id === technicien}
                                                            id={tech.id}
                                                            size="small"
                                                            value={tech.id}
                                                            onClick={handleselectTech}
                                                        />
                                                        <Typography variant="body1">
                                                            <span>{tech.user.prenom} {tech.user.nom}</span>
                                                        </Typography>
                                                    </label>

                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            className="btn"
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleCreateAffectation}
                                        >
                                            Confirmer l'affectation
                                            {affecting && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
