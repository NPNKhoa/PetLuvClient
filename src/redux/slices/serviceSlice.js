import { createSlice } from '@reduxjs/toolkit';
import { getServiceById, getServices } from '../thunks/serviceThunk';

const initialState = {
  services: [],
  service: {},
  loading: false,
  error: null,
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        console.log('error ben slice ', action.payload);
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getServiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(getServiceById.rejected, (state, action) => {
        state.loading = false;
        console.log('error ben slice ', action);
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
