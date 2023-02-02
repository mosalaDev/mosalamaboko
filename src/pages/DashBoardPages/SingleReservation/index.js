import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectById } from '../../../redux/reducers/reservations';
import axios from '../../../config/axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './style.css';

import LoadingData from '../../../components/DashBoard/LoadingData';
import { formatDate, getTime } from '../../../customeFunctionalities/helpers';
import { cancelReservation, getCancelingState, getUpdatingState } from '../../../redux/reducers/reservations';
import { CancelationReason, ConfirmationMessage, LoadingModal } from '../../../components/DashBoard';

export default function SingleReservation() {
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState(useSelector(state => selectById(state, reservationId)));
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('info');
    // const [modif, setModif] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const canceling = useSelector(getCancelingState);
    const updating = useSelector(getUpdatingState);

    // const toggleModif = () => setModif(!modif);

    const dispatch = useDispatch();
    // const handleResend = () => {

    // };

    const toggleCancel = () => {
        setCancel(true);
    };

    const handleCancel = () => {
        dispatch(cancelReservation(reservation.id))
            .then(() => {
                setCancel(false);
                setTimeout(() => {
                    setCanceled(true);
                }, 500);
            });
    };

    // const submitModifications = () => {
    //     dispatch(updateReservation());
    // };

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/reservation/${reservationId}`)
            .then(res => {
                if (res.code) {
                    console.log(res.message);
                    return;
                }

                setReservation(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }, [reservationId]);
    return (
        <div className="dash-content dash-reserv">
            <header>
                <Typography variant="h2" color="textPrimary" style={{ marginBottom: 10 }} className="dash-bg-title">Reservation: {reservation.service.nom_service}</Typography>
                <Typography variant="caption" color="textSecondary"><span>{formatDate(reservation.createdAt)}</span>{reservation.reservation_annulee && <span className="value primary-value">Annulation {reservation.reservation_annulee.etat}</span>}</Typography>
            </header>
            <main className="main-content">
                <div className="filters">
                    <ul className="tabs">
                        <li className={clsx("tab", { "active-tab": filter === 'info' })} onClick={() => handleFilterChange('info')}>
                            Info
                        </li>
                        <li className={clsx("tab", { "active-tab": filter === 'devis' })} onClick={() => handleFilterChange('devis')}>
                            Devis établi
                        </li>
                        <li className={clsx("tab", { "active-tab": filter === 'prestation' })} onClick={() => handleFilterChange('prestation')}>
                            Prestation
                        </li>
                    </ul>
                </div>
                {loading ?
                    <LoadingData /> :
                    reservation.travaux &&
                    <div className="filtered-content">
                        {filter === 'info' &&
                            <div>
                                <div className="reserv-data">
                                    <Typography variant="body2"><span>Service:</span><span className="value secondary-value" style={{ textTransform: 'capitalize' }}>{reservation.service.nom_service}</span></Typography>
                                </div>
                                <div className="reserv-data">
                                    <Typography variant="body2">
                                        <span>Date et heure des travaux:</span>
                                        <span className="value">{formatDate(reservation.date_w)} </span>
                                        <span className="value">{getTime(reservation.date_w)}</span>
                                    </Typography>
                                    <Typography variant="body2"><span>Zone:</span><span className="value">{reservation?.zone?.nom}</span></Typography>
                                    <Typography variant="body2"><span>Commune:</span><span className="value">{reservation.commune}</span></Typography>
                                    <Typography variant="body2"><span>Quartier:</span><span className="value">{reservation.quartier}</span></Typography>
                                    <Typography variant="body2"><span>Avenue:</span><span className="value">{reservation.avenue}</span></Typography>
                                    <Typography variant="body2"><span>Numéro:</span><span className="value">{reservation.numero}</span></Typography>
                                </div>
                                <div>
                                    <Typography variant="body2" style={{ fontSize: 15, fontWeight: 500 }}>
                                        <span>Détails des travaux: </span>
                                        <span>{reservation.autresTravaux}</span>
                                    </Typography>
                                    <TableContainer className="table-container">
                                        <Table aria-label="reservation table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Num</TableCell>
                                                    <TableCell align="right">Travail</TableCell>
                                                    <TableCell align="right">Objects</TableCell>
                                                    <TableCell align="right">Nbre d'objects</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {reservation.travaux.map((travail, index) => (
                                                    <TableRow key={travail.id}>
                                                        <TableCell component="td" scope="row">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell align="right" aria-hidden={travail.nom_travail} aria-label={travail.nom_travail}>{travail.nom_travail}</TableCell>
                                                        <TableCell align="right">{travail.objet}</TableCell>
                                                        <TableCell align="right" style={{ textAlign: 'center' }}>{travail.reservation_travail ? travail.reservation_travail.nbreObjet ? travail.reservation_travail.nbreObjet : 'ND' : 'ND'}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        }
                        {filter === 'devis' &&
                            <div>devis</div>
                        }
                        {filter === 'prestation' &&
                            <div>prestation</div>
                        }
                        <div className="actions">
                            {/* <Button
                                variant="outlined"
                                color="primary"
                                className="btn"
                                onClick={toggleModif}
                            >
                                Modifier
                            </Button>
                            <Button
                                variant="outlined"
                                color="default"
                                className="btn"
                                onClick={handleResend}
                            >
                                Renvoyer la reservation
                            </Button> */}
                            {reservation.etat !== 'annulée' &&
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    className="btn"
                                    onClick={toggleCancel}
                                >
                                    Annuler la reservation
                                </Button>
                            }
                        </div>
                    </div>
                }
            </main>
            {(updating) &&
                <LoadingModal open={updating} />
            }
            {cancel &&
                <ConfirmationMessage
                    open={cancel}
                    messages={['Voulez-vous vraiment annuler cette reservation ?', 'Notez que l\'annulation d\'une reservation implique l\'annulation de la prestation prévue.']}
                    onConfirm={handleCancel}
                    onCancel={() => setCancel(false)}
                    confirmationState={canceling}
                />
            }
            {canceled &&
                <CancelationReason open={canceled} onClose={() => setCanceled(false)} reservationId={reservation.id} />
            }
        </div>
    )
}
