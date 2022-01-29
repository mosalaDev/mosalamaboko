import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainSwitchNavigation, ProfileNavigation, HelpCenterNavigation } from './navigations';
import { Login, Presentation, Signup } from './pages';
import { ForbidenRoute, ProtectedRoute } from './components';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { useDispatch } from 'react-redux';
import { getServices } from './redux/reducers/service';
import { getTravaux } from './redux/reducers/travail';
import { getZones } from './redux/reducers/zones';
import { getConnectedUser } from './redux/reducers/user';
import PasswordRecovery from './pages/login/PasswordRecovery';
import ReactGA from 'react-ga';

const gaID = "UA-213364071-1"

function App() {
  ReactGA.initialize(gaID, {
    debug: false,
    titleCase: false,
    gaOptions: {
      userId: 123,
    }
  })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConnectedUser());
    dispatch(getZones());
    dispatch(getTravaux());
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
      ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={Presentation} />
          <ProtectedRoute
            path="/client/:username"
            component={ProfileNavigation}
          />
          <ForbidenRoute path="/connexion" component={Login} />
          <ForbidenRoute path="/créer_compte" component={Signup} />
          <ForbidenRoute path="/mot_de_passe_oublié" component={PasswordRecovery} />
          <Route path="/aide" component={HelpCenterNavigation} />
          <Route path="/" component={MainSwitchNavigation} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
