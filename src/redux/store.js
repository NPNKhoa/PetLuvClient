import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import serviceReducer from './slices/serviceSlice.js';
import serviceComboSlice from './slices/serviceComboSlice.js';
import roomReducer from './slices/roomSlice.js';
import authReducer from './slices/authSlice.js';
import userReducer from './slices/userSlice.js';
import petReducer from './slices/petSlice.js';

const authUserFilter = createFilter('auth', ['user']);
const serviceFilter = createFilter('services', [
  'service',
  'services',
  'selectedServiceIds',
]);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'services', 'pets'],
  transforms: [authUserFilter, serviceFilter],
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  services: serviceReducer,
  serviceCombos: serviceComboSlice,
  rooms: roomReducer,
  pets: petReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
export default store;
