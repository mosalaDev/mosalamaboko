import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import { Typography, makeStyles } from "@material-ui/core";

import { useGetServices } from "../../customeFunctionalities/data";
import { shaffleArray } from "../../customeFunctionalities/helpers";

export default function UsualWorks() {
    const [gammes, setGammes] = useState([]);
    const {services} = useGetServices();

    const history = useHistory();
    const handleClick = (gamme) => {
        const s = services.find(s => s.id === gamme.serviceId);
        history.push(`/urgence/${s.nom_service}/${gamme.id}`)
    }

    useEffect(() => {
        let g = [];

        services.forEach(s => {
            g.push(...s.gamme_travaux.filter((g, i) => i % 2 === 0));
        });

        g = shaffleArray(g);

        setGammes(g);
    }, [services]);
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				<Typography
					variant="h5"
					className={`${classes.title} big-title`}
				>
					Demandes courantes
				</Typography>
				<Typography
					variant="body1"
					className={`${classes.exp} second-text`}
				>
                    Quelques travaux les plus demandés par nos clients.
                </Typography>
			</div>
			<div className={classes.uWCardList}>
				{gammes.map((g, index) => (
					<div key={`${g.id}_${index}`} onClick={() => handleClick(g)} className={classes.uWCard}>
						<div className={classes.cardBody}>
							<p className={classes.cardTitle}>{g.nom}</p>
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
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		paddingBottom: "40px",
		textAlign: "center",
	},
	uWCardList: {
		display: "flex",
        maxWidth: 600,
        borderRadius: '50%',
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        justifyContent: 'center',
		gap: 15,
		color: "#444",
	},
	uWCard: {
		padding: "7px 20px",
		borderRadius: 3,
		border: "1px solid #d6d6d6",
		textAlign: "center",
		cursor: "pointer",
		transition: ".2s",
		fontWeight: "600",
        color: '#0000008a',
        "& p" : {
            fontSize: '13px!important',
        },
		"&:hover": {
            transform: 'scale(1.2)',
			backgroundColor: 'rgb(255 255 255)',
            boxShadow: '0px 0px 7px #ff7a0059',
			color: theme.palette.secondary.main,
		},
	},
	title: {
		margin: "0 0 20px 0",
		color: "#283d71",
		fontWeight: "400!important",
	},
	cardTitle: {
		textTransform: "capitalize",
		fontSize: 17,
	},
	[theme.breakpoints.down("sm")]: {
		uWCardList: {
			gridTemplateColumns: "auto",
			gap: 5,
		},
	},
}));
