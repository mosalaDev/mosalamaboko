import React, { useState, useEffect } from "react";
import "./mainPage.css";
import { Button } from "@material-ui/core";
import {
	Help,
	UsualWorks,
	Engagements,
	Services,
	DemandePrestationPannel,
	DevenirTechnicien,
	FAQ,
	WhatsappFloatBtn,
	GoUpFloatBtn,
} from "../../components";

import { Typography } from "@material-ui/core";
import ReactGA from 'react-ga';

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

	useEffect(() => {
		ReactGA.pageview('/');
	}, []);
	return (
		<div className="home">
			<GoUpFloatBtn />
			<WhatsappFloatBtn />
			<section className="hero">
				<div className="container inner-content">
					<div className="hero-content">
						<Typography variant="h1" className="title">
							Des technicien(ne)s
							<br />qualifié(e)s près de nous.
						</Typography>
						<Typography variant="h5" className="devise">
							Vous avez une panne ? Obtenez rapidement de l'aide.
						</Typography>
						<div className="actions">
							<Button
								variant="contained"
								color="primary"
								size="large"
								fullWidth
								className="btn hero-btn"
								onClick={handleAskReservation}
							>
								Trouvez un(e) technicien(e)
							</Button>
						</div>
					</div>
					<div className="scroll-indicator">
						<span className="animated-span">
						</span>
					</div>
				</div>
			</section>
			<section className="content help">
				<div className="inner-content">
					<Help />
				</div>
			</section>
			<section className="content engagement">
				<Engagements handleAskReservation={handleAskReservation} />
			</section>
			<section className="content service">
				<Services />
			</section>
			<section className="content usualy-demand">
				<div className="inner-content">
					<UsualWorks />
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
			<DemandePrestationPannel open={open} handleClose={handleClose} />
		</div>
	);
}
