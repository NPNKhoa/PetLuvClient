import { createSlice } from '@reduxjs/toolkit';

import { getServiceCombos } from '../thunks/serviceComboThunk';

const initialState = {
  serviceCombos: [],
  serviceCombo: {},
  loading: false,
  error: null,
};

const serviceComboSlice = createSlice({
  name: 'serviceCombos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getServiceCombos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getServiceCombos.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceCombos = action.payload;
      })
      .addCase(getServiceCombos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceComboSlice.reducer;
