import { createAsyncThunk } from '@reduxjs/toolkit';
import petService from '../../services/pet.service';

export const getPetByUser = createAsyncThunk(
  'pets/getPetByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await petService.getPetCollection(userId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
