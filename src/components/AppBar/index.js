import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./appBar.css";
import logo from "../../assets/logo.png";
import {
	Button,
	Typography,
	Hidden,
	makeStyles,
	useMediaQuery,
	Box,
	IconButton,
	Avatar,
	CircularProgress,
} from "@material-ui/core";
import { Facebook, Instagram, LinkedIn } from "@material-ui/icons";
import { getUser, getConnectionState } from "../../redux/reducers/user";
import UserMenu from "./UserMenu";
import { Phone, Menu } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
import { logoutUser, isLogingOut } from "../../redux/reducers/user";
import { GAEventButton } from "..";
import ReactGA from "react-ga";
import { gaEvent } from "../../customeFunctionalities/reactGa";

export default function AppBar() {
	const [shadow, setShadow] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const history = useHistory();
	const user = useSelector(getUser);
	const isConnected = useSelector(getConnectionState);
	const isHome = window.location.pathname === "/";
	const loading = useSelector(isLogingOut);
	const matches = useMediaQuery("(max-width:600px)");

	const handleTelClick = () => {
		ReactGA.event({
			category: "contact",
			action: "Appel téléphonique",
		});
	};

	const handleScialClick = (name) => {
		gaEvent(`go to ${name}`, "social link clicked", "link");
	};

	const goToReservation = () => {
		history.push("/reservation");
		if (showNav) {
			toggleNav();
		}
	};

	const goToConnection = () => {
		toggleNav();
		history.push("/connexion");
	};

	const toggleNav = () => {
		setShowNav(!showNav);
	};

	const buttonClick = () => {
		toggleNav();
	};

	const dispatch = useDispatch();
	const handleDeconnect = () => {
		dispatch(logoutUser()).then(toggleNav);
	};

	window.addEventListener("scroll", () => {
		const scY = window.scrollY;
		if (scY > 70) {
			setShadow(true);
		} else {
			setShadow(false);
		}
	});

	const classes = useStyles(showNav, user)();
	return (
		<div
			className="appbar"
			style={{
				backgroundColor: shadow || !isHome ? "#ffffff" : "#00000000",
				boxShadow:
					shadow || !isHome
						? "rgb(158 158 158 / 25%) 0px 1px 6px 0px"
						: "rgb(158 158 158 / 25%) 0px 0px 0px 0px",
			}}
		>
			<div className="container">
				<div className="inner-content inner-appbar">
					<Link
						to="/"
						style={{ display: "block", margin: "0 5px 0 5px" }}
					>
						<div className="logo" style={{ height: "100%" }}>
							<div className="logo-image">
								<img src={logo} alt="logo" />
							</div>
						</div>
					</Link>
					<Hidden xsDown>
						<Box display="flex" alignItems="center" pt={1} ml={1}>
							<a
								href="https://www.linkedin.com/company/mosala-maboko"
								target="blank"
								onClick={() => handleScialClick("linkedin")}
								style={{ marginRight: 5 }}
							>
								<LinkedIn
									htmlColor="#007bb5"
									style={{ fontSize: "1.5875rem" }}
								/>
							</a>
							<a
								href="https://facebook.com/mosalamaboko2021"
								target="blank"
								onClick={() => handleScialClick("facebook")}
								style={{ marginRight: 5 }}
							>
								<Facebook
									htmlColor="#3b5998"
									style={{ fontSize: "1.5875rem" }}
								/>
							</a>
							<a
								href="https://www.instagram.com/mosalamaboko"
								target="blank"
								onClick={() => handleScialClick("instagram")}
								style={{ marginRight: 5 }}
							>
								<Instagram
									htmlColor="#E4405F"
									style={{ fontSize: "1.5875rem" }}
								/>
							</a>
						</Box>
					</Hidden>
					<div className="connexion">
						<a href="tel:+243906054917">
							<Box
								display="flex"
								alignItems="center"
								className="phone"
								onClick={handleTelClick}
							>
								<Hidden smDown>
									<IconButton
										size="small"
										style={{ padding: 5 }}
									>
										<Phone fontSize="small" />
									</IconButton>
								</Hidden>
								<Typography
									style={{
										color:
											shadow || !isHome ? "#000" : "#fff",
										fontWeight: 500,
									}}
									className="top-tel"
								>
									+243 906 054 917
								</Typography>
							</Box>
						</a>
						<GAEventButton
							className="btn reserv"
							variant="outlined"
							color="primary"
							fullWidth
							onClick={goToReservation}
							action="Réserver un service"
							label="Réservation de service"
							category="Réservation"
						>
							Réserver<Hidden smDown> une prestation</Hidden>
						</GAEventButton>
						<Hidden smDown>
							{isConnected ? (
								<UserMenu user={user} shadow={shadow || !isHome} />
							) : (
								<GAEventButton
									className="btn"
									variant={matches ? "text" : "contained"}
									disableElevation
									color="secondary"
									onClick={goToConnection}
									category="Utilisateur"
									action="Connexion"
									label="Connection au compte utilisateur"
								>
									Connexion
								</GAEventButton>
							)}
						</Hidden>
						<Hidden mdUp>
							<IconButton
								onClick={toggleNav}
								size="small"
								style={{ marginLeft: 10 }}
							>
								<Menu
									htmlColor={
										shadow || !isHome ? "#333" : "#fff"
									}
								/>
							</IconButton>
						</Hidden>
					</div>
				</div>
			</div>
			<Hidden mdUp>
				<div className={classes.responsiveNav}>
					<div className={classes.responsiveToolbar}>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							p="10px 5px"
						>
							<Link
								to="/"
								style={{
									display: "block",
									margin: "0 5px 0 5px",
								}}
							>
								<div
									className="logo"
									style={{ height: "100%" }}
								>
									<div className="logo-image">
										<img src={logo} alt="logo" />
									</div>
									<Typography
										className="logo-text"
										color="primary"
										style={{ textTransform: "uppercase" }}
									>
										Mosala maboko
									</Typography>
								</div>
							</Link>
							<IconButton
								className={classes.closeBtn}
								onClick={toggleNav}
								size="small"
								style={{ marginLeft: 10 }}
							>
								<Close htmlColor="#333" />
							</IconButton>
						</Box>
						<Box className={classes.menu}>
							{isConnected ? (
								<Box
									p="10px 0"
									textAlign="center"
									display="flex"
									alignItems="center"
									flexDirection="column"
									justifyContent="center"
								>
									<Avatar
										style={{ width: 60, height: 60 }}
									></Avatar>
									<div className={classes.userMenu}>
										<Link to={`/client/${user.username}`}>
											<Typography>Mon profile</Typography>
										</Link>
										<Link
											to={`/client/${user.username}/reservations`}
										>
											<Typography>
												Mes reservations
											</Typography>
										</Link>
										<Link
											to={`/client/${user.username}/devis`}
										>
											<Typography>Mes devis</Typography>
										</Link>
										<Button
											variant="text"
											color="default"
											className="btn"
											style={{ marginTop: 15 }}
											size="small"
											fullWidth
											onClick={handleDeconnect}
										>
											Deconnecter
											{loading && (
												<CircularProgress
													size={10}
													color="inherit"
													style={{ marginLeft: 10 }}
												/>
											)}
										</Button>
									</div>
								</Box>
							) : (
								<>
									<Button
										className="btn"
										variant="text"
										disableElevation
										color="default"
										style={{ marginBottom: 10 }}
										onClick={goToConnection}
									>
										Connexion
									</Button>
									<Link to={`/créer_compte`}>
										<GAEventButton
											className="btn"
											variant="text"
											disableElevation
											color="default"
											style={{ marginBottom: 15 }}
											onClick={buttonClick}
											category="utilisateur"
											action="Création de compte"
											label="Création d'un compte utilisateur"
										>
											Créer un compte
										</GAEventButton>
									</Link>
								</>
							)}
							<Link to={`/devenir_technicien`}>
								<GAEventButton
									className="btn reserv"
									variant="text"
									color="default"
									disableElevation
									fullWidth
									style={{ marginBottom: 15 }}
									onClick={buttonClick}
									category="technicien"
									action="Devenir un technicien"
									label="Création du compte technicien: Menu"
								>
									Devenir un(e) technicien(e)
								</GAEventButton>
							</Link>
							<GAEventButton
								className="btn reserv"
								variant="contained"
								color="primary"
								disableElevation
								onClick={goToReservation}
								style={{ marginBottom: 10 }}
								action="Réserver un service"
								label="Réservation de service"
								category="Réservation"
							>
								Réserver une prestation
							</GAEventButton>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="center"
								p={1}
								mt={1}
							>
								<a
									href="https://www.linkedin.com/company/mosala-maboko"
									target="blank"
									onClick={() => handleScialClick("linkedin")}
									style={{ marginRight: 5 }}
								>
									<LinkedIn
										htmlColor="#007bb5"
										style={{ fontSize: "1.8875rem" }}
									/>
								</a>
								<a
									href="https://facebook.com/mosalamaboko2021"
									target="blank"
									onClick={() => handleScialClick("facebook")}
									style={{ marginRight: 5 }}
								>
									<Facebook
										htmlColor="#3b5998"
										style={{ fontSize: "1.8875rem" }}
									/>
								</a>
								<a
									href="https://www.instagram.com/mosalamaboko"
									target="blank"
									onClick={() =>
										handleScialClick("instagram")
									}
									style={{ marginRight: 5 }}
								>
									<Instagram
										htmlColor="#E4405F"
										style={{ fontSize: "1.8875rem" }}
									/>
								</a>
							</Box>
						</Box>
						<Box
							borderTop="1px solid #eaeaea"
							p={2}
							style={{
								position: "absolute",
								bottom: 0,
								left: 0,
								right: 0,
							}}
						>
							<Typography
								className="small-title"
								style={{ marginBottom: 10 }}
							>
								Contacts
							</Typography>
							<Box component="ul">
								<li>
									<a href="tel:+243906054917">
										<Typography
											style={{
												fontSize: 14,
												color: "#888",
											}}
										>
											+243 906 054 917
										</Typography>
									</a>
								</li>
								<li>
									<a href="mailto:contacts@mosalamaboko.com">
										<Typography
											style={{
												fontSize: 14,
												color: "#888",
											}}
										>
											contacts@mosalamaboko.com
										</Typography>
									</a>
								</li>
								<li>
									<Typography
										style={{ fontSize: 14, color: "#888" }}
									>
										Av. 7, De la Douane, Q. de la Gare, Gombe,
										Kinshasa
									</Typography>
								</li>
							</Box>
						</Box>
					</div>
				</div>
			</Hidden>
		</div>
	);
}

const useStyles = (showNav, user) =>
	makeStyles((theme) => ({
		container: {},
		responsiveNav: {
			position: "absolute",
			top: showNav ? 0 : "-100vh",
			opacity: showNav ? 1 : 0,
			boxShadow: "0px 2px 10px #938e8e",
			left: 0,
			right: 0,
			backgroundColor: "#fff",
			transition: theme.transitions.create("top, opacity", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		responsiveToolbar: {
			height: "100vh",
			padding: "0 15px",
			display: "flex",
			flexDirection: "column",
		},
		menu: {
			height: "calc(100% - 200px)",
			display: "flex",
			flexDirection: "column",
			alignItems: user ? "center" : "flex-start",
			justifyContent: "center",
		},
		userMenu: {
			margin: "10px 0 0",
			"& > a": {
				display: "block",
				padding: "5px 10px",
				border: "1px solid #eaeaea",
				borderRadius: 30,
				marginBottom: 10,
			},
		},
	}));
