import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';

import serviceSlice from './slices/serviceSlice.js';
import serviceComboSlice from './slices/serviceComboSlice.js';
import roomReducer from './slices/roomSlice.js';
import authReducer from './slices/authSlice.js';

const authUserFilter = createFilter('auth', ['user']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [authUserFilter],
};

const rootReducer = combineReducers({
  auth: authReducer,
  services: serviceSlice,
  serviceCombos: serviceComboSlice,
  rooms: roomReducer,
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
