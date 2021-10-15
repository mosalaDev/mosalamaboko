import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import './style.css';
import { TechniciensList, TechProfile } from '../../../components/Admin';

export default function Techniciens() {
    const { path } = useRouteMatch();
    return (
        <div className="admin-technicien">
            <div className="tech-profile">
                <Switch>
                    <Route path={`${path}/:artisanId`} component={TechProfile} />
                    <Route path={path} component={TechniciensList} />
                </Switch>
            </div>
        </div>
    );
}
