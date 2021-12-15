import React from 'react';
import { Route, Redirect } from 'react-router';

export default (
	<Route>
        <Route path="/" />
        <Route path="/client" />
        <Route path="/devenir_technicien" />
        <Route path="/connexion" />
        <Route path="/créer_compte" />
        <Route path="/mot_de_passe_oublié" />
        <Route path="/reservation" />
        <Route path="/urgence" />
        <Route path="/aide" />
		<Redirect from='/home' to='/' />
		<Route path='*' />
	</Route>
);