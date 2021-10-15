import React, { useState } from 'react';
import './mainPage.css';
import { Button } from '@material-ui/core';
import { Help, UsualWorks, Engagements, Services, DemandePrestationPannel, DevenirTechnicien, FAQ } from '../../components';

import { Typography } from '@material-ui/core';
import banner from '../../assets/small-banner.png';

export default function MainPage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAskReservation = () => {
        handleOpen();
    };
    return (
        <div className="home">
            <section className="content hero">
                <div className="container">
                    <div className="inner-content">
                        <div className="hero-content">
                            <div>
                                <Typography variant="h1" className="title">Des technicien(ne)s qualifié(e)s près de nous.</Typography>
                                <Typography variant="h5" className="devise">Vous avez une panne ? Obtenez rapidement de l'aide</Typography>
                                <div className="actions">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                        className="btn hero-btn"
                                        onClick={handleAskReservation}
                                    >Trouvez un technicien</Button>
                                </div>
                            </div>
                            <div className="hero-image">
                                <img src={banner} alt="banner" className="small-banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content help">
                <div className="inner-content">
                    <Help />
                </div>
            </section>
            <section className="content service">
                <Services />
            </section>
            <section className="content engagement">
                <Engagements handleAskReservation={handleAskReservation} />
            </section>
            <section className="content">
                <div className="container">
                    <div className="inner-content">
                        <UsualWorks />
                    </div>
                </div>
            </section>
            <section className="content devenir">
                <div className="container">
                    <DevenirTechnicien />
                </div>
            </section>
            <section className="content faq">
                <div className="container">
                    <FAQ />
                </div>
            </section>
            <DemandePrestationPannel
                open={open}
                handleClose={handleClose}
            />
        </div>
    )
}
