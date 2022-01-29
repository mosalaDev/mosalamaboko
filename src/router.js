import React from 'react';
import { Switch, Route } from 'react-router';

export default (
	<Switch>
        <Route path="/client" />
        <Route path="/devenir_technicien" />
        <Route path="/connexion" />
        <Route path="/créer_compte" />
        <Route path="/mot_de_passe_oublie" />
        <Route path="/reservation" />
        <Route path="/urgence" />
        <Route path="/aide" />
	</Switch>
);