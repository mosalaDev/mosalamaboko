import React, {useEffect} from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import './style.css';
import Part1 from './Part1';
import Part2 from './Part2';
import { Signup } from '..';
import ReactGA from 'react-ga';

export default function DevenirTechnicien() {
    const { path } = useRouteMatch();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="tech-container">
            <Switch>
                <Route path={`${path}/1/créer_compte`} component={Signup} />
                <Route path={`${path}/1`} component={Part1} />
                <Route path={`${path}/2`} component={Part2} />
                <Route path={path} component={() => <Redirect to={`${path}/1`} />} />
            </Switch>
        </div>
    )
}
