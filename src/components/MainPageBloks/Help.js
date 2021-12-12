import React from "react";
import "./styles.css";
import clsx from "clsx";
import { Typography, makeStyles } from "@material-ui/core";
import { helpContents } from "../../customeFunctionalities/data";

export default function Help() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<Typography variant="h4" className={classes.title}>
					Commencez dès maintenant
				</Typography>
			</div>
			<div className={clsx(classes.helpCardList, "help-card-list")}>
				{helpContents.map((hc, index) => (
					<div
						key={`${hc.badge}_${index}`}
						className={clsx(classes.helpCard, "help-card")}
					>
						<div className={classes.innerCard}>
							<div
								className={`${classes.cardBlock} ${classes.cardHeader}`}
							>
								<span className={classes.cardBadge}>
									{hc.badge}
								</span>
								<img src={hc.image} alt={hc.title} />
							</div>
							<div
								className={`${classes.cardBlock} ${classes.cardBody}`}
							>
								<span className={classes.cardTitle}>
									{hc.title}
								</span>
								<p className={classes.cardText}>{hc.body}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	header: {
		padding: "0 20px 30px 20px",
		textAlign: "center",
	},
	title: {
		fontSize: 37,
		color: "#283d71",
	},
	exp: {
		fontSize: 18,
	},
	helpCardList: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr 1fr",
		gap: 20,
		backgroundColor: "#fff",
	},
	helpCard: {
		backgroundColor: "#fbfbfb",
		color: "#444",
		width: "100%",
		padding: "10px 15px",
		"&:not(:last-child)": {
			marginRight: 10,
		},
	},
	innerCard: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	cardBlock: {
		flex: 1,
		padding: "10px 20px",
		position: "relative",
	},
	cardHeader: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "5px 0",
		maxHeight: 200,
		"& > img": {
			width: "60%",
			[theme.breakpoints.between(600, 750)]: {
				width: "40%",
			},
		},
	},
	cardBadge: {
		position: "absolute",
		top: 15,
		left: 50,
		marginRight: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		minWidth: 35,
		height: 35,
		color: "#fff",
		backgroundColor: theme.palette.primary.main,
		fontWeight: 600,
	},
	cardTitle: {
		fontWeight: 700,
		fontSize: 23,
		marginBottom: 10,
		marginTop: "-6px",
		display: "block",
		color: theme.palette.primary.main,
	},
	cardBody: {
		fontWeight: "400",
		fontSize: 15,
		textAlign: "center",
	},
	cardText: {
		fontSize: 15,
	},
	[theme.breakpoints.down(810)]: {
		title: {
			fontSize: 30,
		},
		helpCard: {
			padding: "20px 10px",
		},
		innerCard: {
			flexDirection: "column!important",
		},
		cardBody: {
			flexDirection: "column",
			alignItems: "center",
			textAlign: "center",
		},
		cardTitle: {
			fontSize: 17,
			marginTop: 10,
		},
	},
	[theme.breakpoints.down(750)]: {
		helpCardList: {
			gridTemplateColumns: "1fr",
		},
		cardTitle: {
			fontSize: 20,
		},
	},
	[theme.breakpoints.down("sm")]: {
		title: {
			fontSize: 23,
		},
	},
}));
