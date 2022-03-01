import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { Typography, makeStyles } from "@material-ui/core";
import other from "../../assets/repair_tool.png";

import { useGetServices } from "../../customeFunctionalities/data";

export default function Services() {
	const { services, loading } = useGetServices();

	const history = useHistory();
	const handleServiceClick = (serviceId) => {
		history.push(`/reservation/${serviceId}`);
	};

	const classes = useStyles();
	return (
		<div className={classes.container}>
			{(!loading &&
				services.length !== 0) && (
					<div className="container">
						<div>
							<div className={classes.innerContainer}>
								<div className={classes.header}>
									<div className={classes.titleContainer}>
										<Typography
											variant="h5"
											className={`${classes.title} big-title`}
										>
											Nos services
										</Typography>
										<Typography
											variant="body1"
											className={`${classes.exp} second-text`}
										>
											Nous mettons à votre disposition des
											technicien(e)s spécialisé(e)s dans les
											domaines ci-dessous.
										</Typography>
									</div>
								</div>
								<div className={classes.serviceList}>
									{services.map((service, index) => (
										<div
											key={`${service.name}_${index}`}
											onClick={() =>
												handleServiceClick(service.id)
											}
											className={clsx(
												classes.serviceCard,
												"home-service-card"
											)}
											style={{
												boxShadow: `2px 2px 10px ${service.color}42`,
											}}
										>
											<div className={classes.cardHeader}>
												<div
													className={
														classes.imageContainer
													}
												>
													<img
														src={service.image}
														alt={service.nom_service}
														className={
															classes.image
														}
													/>
												</div>
											</div>
											<div className={classes.cardBody}>
												<Typography
													variant="body1"
													style={{
														fontSize: 15,
														textTransform:
															"capitalize",
													}}
												>
													{service.nom_service}
												</Typography>
											</div>
										</div>
									))}
									<div
										className={clsx(
											classes.serviceCard,
											"home-service-card"
										)}
										style={{
											boxShadow: `2px 2px 10px #48484842`,
										}}
									>
										<div className={classes.cardHeader}>
											<div
												className={
													classes.imageContainer
												}
												style={{
													backgroundColor: "#484848",
												}}
											>
												<img
													src={other}
													alt="Autres Services"
													className={classes.image}
												/>
											</div>
										</div>
										<div className={classes.cardBody}>
											<Typography
												variant="body1"
												style={{ fontSize: 15 }}
											>
												Autres services
											</Typography>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: "inherit",
	},
	innerContainer: {
		display: "flex",
		flexDirection: "column",
	},
	header: {
		padding: "0 20px 40px 20px",
	},
	title: {
		color: "#283d71",
		textAlign: "center",
		fontWeight: "400!important",
	},
	exp: {
		textAlign: 'center',
		maxWidth: 700,
		margin: 'auto'
	},
	logoContainer: {
		width: 95,
		height: 95,
		marginRight: 20,
	},
	serviceList: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr 1fr",
		rowGap: 20,
		columnGap: 30,
		margin: "auto",
		padding: "0 20px",
		alignContents: "center",
		[theme.breakpoints.down("md")]: {
			gridTemplateColumns: "1fr 1fr",
			justifyContent: "center",
		},
		[theme.breakpoints.down("xs")]: {
			padding: "0 10px",
			gridTemplateColumns: "1fr",
		},
	},
	serviceCard: {
		flex: 1,
		width: 250,
		borderRadius: 15,
		height: 200,
		textAlign: "center",
		padding: "20px",
		display: "flex!important",
		flexDirection: "column",
		alignItems: "center",
		zIndex: 2,
		backgroundColor: "#fff",
		"&:hover": {
			boxShadow: "none!important",
		},
	},
	cardHeader: {
		display: "flex",
		justifyContent: "center",
		marginBottom: 15,
	},
	imageContainer: {
		width: 90,
		height: 90,
		borderRadius: "50%",
		overflow: "hidden",
		[theme.breakpoints.down("xs")]: {
			width: 50,
			height: 50,
		},
	},
	cardBody: {
		marginTop: 10,
		"& *": {
			fontWeight: "700!important",
			color: "inherit",
		},
	},
	carButton: {
		position: "absolute",
		top: 0,
		bottom: 0,
		display: "flex!important",
		alignItems: "center",
		justifyContent: "center",
		cursor: "pointer",
		zIndex: 10,
		padding: 15,
		"&:hover": {
			backgroundColor: "#d2d2d217",
		},
	},
	nextArrow: {
		right: 0,
	},
	prevArrow: {
		left: 0,
	},
	[theme.breakpoints.down("sm")]: {
		serviceCard: {
			height: 190,
		},
	},
}));
