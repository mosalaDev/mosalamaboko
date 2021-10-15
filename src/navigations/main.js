import React, { useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Footer } from '../components';
import { MainPage, DemandeDevis, Reservation, TrouverArtisan, TechnicienForm } from '../pages';

export default function MainSwitchNavigation() {
    return (
        <>
            <div className="topbar">
                <AppBar />
            </div>
            <div className="main-container">
                <Switch>
                    <Route path="/devenir_technicien" component={TechnicienForm} />
                    <Route
                        path="/"
                        exact
                        component={() => <MainPage />}
                    />
                    <Route
                        path="/demande_devis"
                        exact
                        component={DemandeDevis}
                    />
                    <Route
                        path="/reservation"
                        exact
                        component={Reservation}
                    />
                    <Route
                        path="/urgence/:service"
                        exact
                        component={TrouverArtisan}
                    />
                </Switch>
            </div>
            <Footer />
        </>
    );
}