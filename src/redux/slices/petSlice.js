import { createSlice } from '@reduxjs/toolkit';
import { getPetByUser } from '../thunks/petThunk';

const initialState = {
  pet: {},
  pets: [],
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Collection
    builder
      .addCase(getPetByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.pets = action.payload;
      })
      .addCase(getPetByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;
