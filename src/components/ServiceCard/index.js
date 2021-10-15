import React from 'react';
import './serviceCard.css';
import { Typography } from '@material-ui/core';

export default function ServiceCard({ service }) {
    return (
        <div className="service-card">
            <div className="image-container">
                <img src={service.image} alt={service.name} />
            </div>
            <div className="body">
                <Typography variant="h5" className="name">{service.artisan}</Typography>
                <ul className="">
                    {service.services.map((serv, index) => (
                        <li key={`${serv}_${index}`} className="">{serv.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
