import { configureStore } from '@reduxjs/toolkit';
import { reducer as travailReducer } from './reducers/travail';
import { reducer as serviceReducer } from './reducers/service';
import { reducer as zoneReducer } from './reducers/zones';
import { reducer as userReducer } from './reducers/user';
import { reducer as userReservationReducer } from './reducers/reservations';
import { reducer as userDevisReducer } from './reducers/devis';

export const store = configureStore({
    reducer: {
        zones: zoneReducer,
        travaux: travailReducer,
        services: serviceReducer,
        user: userReducer,
        userReservations: userReservationReducer,
        userDevis: userDevisReducer
    }
});