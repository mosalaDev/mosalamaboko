import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './reservation.css';
import { Typography, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ReservationCard, NoData } from '../../../components/DashBoard';
import { SearchInput } from '../../../components';
import { selectAll, getUserReservations } from '../../../redux/reducers/reservations';

export default function UserReservations() {
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [reservations, setReservations] = useState([]);

    const reserv = useSelector(selectAll);

    React.useEffect(() => {
        if (filter === 'all') {
            setReservations(reserv);
        } else {
            const r = reserv.filter(res => res.gravite === filter);
            setReservations(r);
        }
    }, [filter, reserv]);

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserReservations());
    }, [dispatch]);

    const handleFilterChange = (filter) => {
        setFilter(filter);
    };
    return (
        <article className="dash-content dash-reservation">
            <header>
                <Typography variant="h2" color="textSecondary" className="dash-bg-title">Mes reservations</Typography>
            </header>
            <main className="main-content">
                <div className="tools">
                    <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
                    <Link to="/reservation">
                        <Button
                            className="btn"
                            variant="text"
                            color="primary"
                        >
                            <Add style={{ marginRight: 10 }} />
                            Nouvelle reservation
                        </Button>
                    </Link>
                </div>
                <div className="filters">
                    <ul className="tabs">
                        <li className={clsx("tab", { "active-tab": filter === 'all' })} onClick={() => handleFilterChange('all')}>Toutes</li>
                        <li className={clsx("tab", { "active-tab": filter === 'retardé' })} onClick={() => handleFilterChange('retardé')}>Retardées</li>
                        <li className={clsx("tab", { "active-tab": filter === 'urgence' })} onClick={() => handleFilterChange('urgence')}>Urgences</li>
                    </ul>
                </div>
                <div className="vertical-list reservation-list">
                    {reservations.length === 0 ?
                        <NoData message="Vous n'avez aucune reservation !" /> :
                        reservations.map(reservation => (
                            <ReservationCard key={reservation.id} reservation={reservation} />
                        ))
                    }
                </div>
            </main>
            <aside className="">

            </aside>
        </article>
    )
}
