import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import './style.css';
import { SectionHeader } from '../../components';
import { Button, Typography } from '@material-ui/core';
import axios from '../../../config/axios';

export default function Reservation() {
    // const reservations = useSelector(selectAll);
    const [reservations, setReservations] = useState([]);
    const [search, setSearch] = useState('');
    const { url } = useRouteMatch();

    console.log(reservations);

    const history = useHistory();
    const goToSingleReservation = (id) => {
        history.push(`${url}/${id}`);
    };

    useEffect(() => {
        axios
            .get('/api/reservation')
            .then(res => {
                if (res.data.code) {
                    console.log(res.data);
                } else {
                    setReservations(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { });
    }, []);

    return (
        <div className="admin-reservations">
            <div className="affectations">
                <Typography style={{ fontSize: 15 }}>Affectations en cours</Typography>
            </div>
            <div className="reservations-container">
                <section>
                    <SectionHeader
                        title="Reservations en cours"
                        searchValue={search}
                        onSearchValueChange={setSearch}
                    />
                    <div className="table">
                        <div className="tbody">
                            {reservations.map((reservation, index) => {
                                const d_w = (new Date(reservation.date_w)).toLocaleDateString()
                                return (
                                    <div key={reservation.id} className="tr" onClick={() => goToSingleReservation(reservation.id)}>
                                        <span className="tc" style={{ minWidth: 50 }}>{index + 1}</span>
                                        <span className="tc">{reservation.service.nom_service}</span>
                                        <span className="tc">{reservation.user.tel}</span>
                                        <span className="tc">{d_w}</span>
                                        <span className="tc">{reservation.gravite}</span>
                                        <Button
                                            className="btn"
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            disableElevation
                                        >
                                            Ouvrir
                                        </Button>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
