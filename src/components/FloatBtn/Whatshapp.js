import React, { useEffect, useState } from "react";
import {
	Fab,
	makeStyles,
	Typography,
	Fade,
	useMediaQuery,
} from "@material-ui/core";
import WhatsappIcon from "@material-ui/icons/WhatsApp";
import ReactGA from "react-ga";

export default function WhatsappFloatBtn() {
	const [descript, setDescript] = useState(false);
	const matches = useMediaQuery("(max-width: 599.95px)");

	const handleClick = () => {
		ReactGA.event({
			category: "contact",
			action: "Chat whatsapp",
		});
	};

	useEffect(() => {
		setTimeout(() => {
			if (descript) setDescript(false);
		}, 5000);
	}, [descript]);
	useEffect(() => {
		setTimeout(() => {
			setDescript(true);
		}, 1000);
	}, []);
	const classes = useStyles();
	return (
		<a
			href="https://wa.me/message/YBC3T72IPIMAE1"
			style={{ position: "relative" }}
		>
			<Fab
				onMouseEnter={() => setDescript(true)}
				onMouseLeave={() => setDescript(false)}
				onClick={handleClick}
				size={matches ? "medium" : "large"}
				variant="round"
				color="primary"
				className={classes.root}
			>
				<WhatsappIcon />
			</Fab>
			<Fade in={descript}>
				<div className={classes.descript}>
					<Typography>Contactez-nous sur whatsapp.</Typography>
					<span />
				</div>
			</Fade>
		</a>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		right: 35,
		bottom: 60,
		zIndex: 19,
		backgroundColor: "#25D366!important",
		[theme.breakpoints.down('sm')]: {
			right: 15,
		}
	},
	descript: {
		position: "fixed",
		backgroundColor: "#fff",
		padding: "10px 22px",
		borderRadius: 20,
		color: "#555",
		zIndex: 20,
		bottom: 127,
		right: 45,
		border: "1px solid #eaeaea",
		[theme.breakpoints.down("sm")]: {
			right: 30,
		},
		[theme.breakpoints.down("xs")]: {
			bottom: 115,
		},
		"& > span": {
			backgroundColor: "#fff",
			width: 20,
			height: 20,
			transform: "rotate(25deg)",
			position: "absolute",
			bottom: -5,
			right: 6,
			borderBottom: '1px solid #eaeaea',
			borderRight: '1px solid #eaeaea',
		},
	},
}));
