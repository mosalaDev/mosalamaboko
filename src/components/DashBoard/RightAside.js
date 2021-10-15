import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, IconButton, Typography } from '@material-ui/core';
import { useGetServices } from '../../customeFunctionalities/data';
import { DemandePrestationPannel } from '..';
import { Close } from '@material-ui/icons';
export default function RightAside({ open, handleClose }) {
    const { services } = useGetServices();
    const [openDemandePannel, setOpenDemandePannel] = useState(false);

    const handleOpenDemandePannel = () => {
        handleClose();
        setOpenDemandePannel(true);
    };

    const handleClosePannel = () => {
        setOpenDemandePannel(false);
    };
    const handleAskReservation = () => {
        handleOpenDemandePannel();
    };

    return (
        <aside className={clsx("right-aside", open ? "r-aside-open" : '')} tabIndex={0}>
            <div className="inner-aside">
                <IconButton className="close-right-aside" onClick={handleClose}>
                    <Close />
                </IconButton>
                <div className="vertical-list">
                    <div className="aside-card" style={{ marginBottom: 0 }}>
                        <div>
                            <Typography variant="body1">Prestations</Typography>
                            <Typography variant="caption" color="textSecondary">Toutes les prestation effectué pour vous.</Typography>
                        </div>
                        <div>
                            <Typography variant="body2" className="amount">0</Typography>
                        </div>
                    </div>
                    <div className="aside-card">
                        <div>
                            <Typography variant="body1">Transactions</Typography>
                            <Typography variant="caption" color="textSecondary">Le total de vos transactions.</Typography>
                        </div>
                        <div>
                            <Typography variant="body2" className="amount">0 fc</Typography>
                        </div>
                    </div>
                </div>
                <div className="vertical-list side-services">
                    <Typography varant="h5" className="dash-sm-title">Services disponibles</Typography>
                    {services.map((service) => (
                        <div key={service.id} className='aside-service-card'>
                            <div className="service-image">
                                <img src={service.image} alt={service.nom_service} />
                            </div>
                            <Typography variant="body2">{service.nom_service}</Typography>
                        </div>
                    ))}
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        onClick={handleAskReservation}
                    >Trouver un technicien</Button>
                    <DemandePrestationPannel
                        open={openDemandePannel}
                        handleClose={handleClosePannel}
                    />
                </div>
            </div>
        </aside>
    )
}
