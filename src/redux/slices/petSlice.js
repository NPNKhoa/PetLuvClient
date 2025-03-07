import { createSlice } from '@reduxjs/toolkit';
import { getPetByUser, getPetInfo, updatePetInfo } from '../thunks/petThunk';

const initialState = {
  pet: {},
  pets: [],
  selectedPetId: null,
  loading: false,
  error: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setSelectedPet: (state, action) => {
      state.selectedPetId = action.payload;
    },
    resetSelectedPet: (state) => {
      state.selectedPetId = null;
    },
  },
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

    // Get Pet Info
    builder
      .addCase(getPetInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPetInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(getPetInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Pet Info
    builder
      .addCase(updatePetInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePetInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      })
      .addCase(updatePetInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default petSlice.reducer;

export const { setSelectedPet, resetSelectedPet } = petSlice.actions;
