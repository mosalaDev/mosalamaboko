import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import { NoData } from '../../../components/DashBoard';

export default function UserDevis() {
    const [devis, setDevis] = useState([]);
    return (
        <article className="dash-content dash-devis">
            <header>
                <Typography variant="h2" color="textSecondary" className="dash-bg-title">Mes devis</Typography>
            </header>
            <div className="vertical-list devis-list">
                {devis.length === 0 ?
                    <NoData message="Vous n'avez aucun devis !" /> :
                    devis.map(devis => (
                        <div key={devis.id} devis={devis} />
                    ))
                }
            </div>
        </article>
    )
}
