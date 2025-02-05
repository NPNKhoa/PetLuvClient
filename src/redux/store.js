import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

import serviceSlice from './slices/serviceSlice.js';
import serviceComboSlice from './slices/serviceComboSlice.js';
import roomReducer from './slices/roomSlice.js';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
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
