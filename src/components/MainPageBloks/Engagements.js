import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import "./styles.css";
import { engagements } from "../../customeFunctionalities/data";

export default function Engagements() {
	const classes = useStyles();
	return (
		<div className="container">
			<div className="inner-content">
				<div className={classes.container}>
					<div className={classes.content}>
						{engagements.map((engagement, i) => (
							<div key={`${i}`} className={classes.card}>
								<div className={classes.imageContainer}>
									<img
										src={engagement.image}
										alt={engagement.text}
									/>
								</div>
								<div className={classes.details}>
									<Typography color="inherit">
										{engagement.text.map(t => (
                                            <span key={t}>{t}</span>
                                        ))}
									</Typography>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

const useStyles = makeStyles(theme => ({
	container: {
		minHeight: "10vh",
		display: "flex",
		alignItems: "center",
	},
	content: {
        width: '100%',
		display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gap: 20,
		textAlign: "center",
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: "1fr 1fr 1fr",
			justifyContent: 'center'
		}
	},
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flex: 1,
        width: '100%',
		"&:not(:last-child)": {
			marginRight: 10,
		},
	},
	imageContainer: {
		"& > img": {
			height: 70,
			width: 60,
            marginBottom: 10,
			[theme.breakpoints.down('xs')]: {
				height: 40,
				width: 35,
			}
		},
	},
	details: {
		"& > p span": {
			fontSize: 14,
            display: 'block',
            color: '#fff',
            lineHeight: 1.1,
		},
	},
}));
