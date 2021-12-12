import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './style.css';
import { Typography, ButtonBase } from '@material-ui/core';
import { useTheme, fade } from '@material-ui/core/styles';

export default function ReservationCard({ reservation }) {
    const isUrgent = reservation.gavite === "urgence";
    const theme = useTheme();
    const { url } = useRouteMatch();
    return (
        <Link to={`${url}/${reservation.id}`} style={{ display: 'block', width: '100%' }}>
            <ButtonBase className="reservation-card" color="#0020b10a" style={{ width: '100%', borderRadius: 5, border: `1px solid ${fade(isUrgent ? theme.palette.secondary.main : theme.palette.primary.main, 0.1)}` }}>
                <div className="description">
                    <Typography variant="body1">Reservation {reservation.service.nom_service}</Typography>
                    <Typography variant="caption" color="textSecondary" style={{ display: 'block' }} >
                        {(new Date(reservation.createdAt)).toLocaleDateString('fr')}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>
                        Prestation le {(new Date(reservation.date_w)).toLocaleDateString('fr')}
                    </Typography>
                </div>
                <div className="state">
                    <Typography variant="body2">{reservation.etat}</Typography>
                </div>
            </ButtonBase>
        </Link>
    )
}