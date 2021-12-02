import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Footer } from '../components';
import { MainPage, DemandeDevis, Reservation, TrouverArtisan, TechnicienForm } from '../pages';

export default function MainSwitchNavigation() {
    const isHome = window.location.pathname === "/";

    return (
        <>
            <div className="topbar">
                <AppBar />
            </div>
            <div className="main-container" style={{paddingTop: isHome ? 0 : 70}}>
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
                        path="/reservation/:serviceId"
                        exact
                        component={Reservation}
                    />
                    <Route
                        path="/reservation"
                        exact
                        component={Reservation}
                    />
                    <Route
                        path="/urgence/:service/:gammeId"
                        exact
                        component={TrouverArtisan}
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