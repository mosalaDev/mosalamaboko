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
import { getUser, getConnectionState } from "../../redux/reducers/user";
import UserMenu from "./UserMenu";
import { Phone, Menu } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
import { logoutUser, isLogingOut } from "../../redux/reducers/user";

export default function AppBar() {
	const [shadow, setShadow] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const history = useHistory();
	const user = useSelector(getUser);
	const isConnected = useSelector(getConnectionState);
	const isHome = window.location.pathname === "/";
	const loading = useSelector(isLogingOut);
	const matches = useMediaQuery("(max-width:600px)");

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
					<div className="connexion">
						<Box
							display="flex"
							alignItems="center"
							className="phone"
						>
							<Hidden xsDown>
								<IconButton size="small" style={{ padding: 5 }}>
									<Phone fontSize="small" />
								</IconButton>
							</Hidden>
							<Typography
								style={{
									color: shadow || !isHome ? "#000" : "#fff",
									fontWeight: 500,
								}}
								className="top-tel"
							>
								+243 906 054 917
							</Typography>
						</Box>
						<Button
							className="btn reserv"
							variant="outlined"
							color="primary"
							fullWidth
							onClick={goToReservation}
						>
							Réserver<Hidden xsDown> une prestation</Hidden>
						</Button>
						<Hidden xsDown>
							{isConnected ? (
								<UserMenu user={user} />
							) : (
								<Button
									className="btn"
									variant={matches ? "text" : "contained"}
									disableElevation
									color="secondary"
									onClick={goToConnection}
								>
									Connexion
								</Button>
							)}
						</Hidden>
						<Hidden smUp>
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
			<Hidden smUp>
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
										<Button
											className="btn"
											variant="text"
											disableElevation
											color="default"
											style={{ marginBottom: 15 }}
											onClick={buttonClick}
										>
											Créer un compte
										</Button>
									</Link>
								</>
							)}
							<Link to={`/devenir_technicien`}>
								<Button
									className="btn reserv"
									variant="text"
									color="default"
									disableElevation
									fullWidth
									style={{ marginBottom: 15 }}
									onClick={buttonClick}
								>
									Devenir un(e) technicien(e)
								</Button>
							</Link>
							<Button
								className="btn reserv"
								variant="contained"
								color="primary"
								disableElevation
								onClick={goToReservation}
								style={{ marginBottom: 10 }}
							>
								Réserver une prestation
							</Button>
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
									<Typography
										style={{ fontSize: 14, color: "#888" }}
									>
										+243 906 054 917
									</Typography>
								</li>
								<li>
									<Typography
										style={{ fontSize: 14, color: "#888" }}
									>
										contacts@mosalamaboko.com
									</Typography>
								</li>
								<li>
									<Typography
										style={{ fontSize: 14, color: "#888" }}
									>
										Av. De la Douane, Q. de la Gare, Gombe,
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
