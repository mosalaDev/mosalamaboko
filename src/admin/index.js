import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { SideBar } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { AdminHome, AdminReservations, AdminNotifications, AdminTechniciens, AdminSingleReservation } from './pages';
import { getUserReservations } from '../redux/reducers/reservations';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function AdminNavigation() {
    const classes = useStyles();
    const { path } = useRouteMatch();

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getUserReservations());
    }, [dispatch]);

    return (
        <Provider store={store}>
            <div className={clsx(classes.admin, "admin")}>
                <SideBar />
                <div className={classes.contentContainer}>
                    <Switch>
                        <Route
                            path={`${path}/reservations`}
                            component={() => (
                                <Switch>
                                    <Route path={`${path}/reservations/:reservationId`} component={AdminSingleReservation} />
                                    <Route path={`${path}/reservations`} component={AdminReservations} />
                                </Switch>
                            )}
                        >
                        </Route>
                        <Route path={`${path}/notifications`} component={AdminNotifications} />
                        <Route path={`${path}/techniciens`} component={AdminTechniciens} />
                        <Route path={path} component={AdminHome} />
                    </Switch>
                </div>
            </div>
        </Provider>
    );
}

const useStyles = makeStyles({
    admin: {
        width: '100vw',
        backgroundColor: '#fff',
    },
    contentContainer: {
        margin: 'auto',
        marginTop: 100,
        minHeight: 'calc(100vh - 100px)',
        maxWidth: 1100,
    }
});