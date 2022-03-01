import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Footer } from '../components';
import { MainPage, DemandeDevis, Reservation, TrouverArtisan, TechnicienForm } from '../pages';

export default function MainSwitchNavigation() {
    const isHome = window.location.pathname === "/";
	const [shadow, setShadow] = useState(false);
    window.addEventListener("scroll", () => {
		const scY = window.scrollY;
		if (scY > 10) {
			setShadow(true);
		} else {
			setShadow(false);
		}
	});
    return (
        <>
            <div className="topbar"
                style={{
                    backgroundColor: "#ffffff",
                    boxShadow:
                        shadow || !isHome
                            ? "rgb(158 158 158 / 25%) 0px 1px 6px 0px"
                            : "rgb(158 158 158 / 25%) 0px 0px 0px 0px",
                }}
            >
                <AppBar />
            </div>
            <div className="main-container" style={{paddingTop: 70}}>
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