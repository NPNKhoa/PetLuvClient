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

export const getPetInfo = createAsyncThunk(
  'pets/getPetInfo',
  async (petId, { rejectWithValue }) => {
    try {
      const response = await petService.getById(petId);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data?.data || response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const addPetToCollection = createAsyncThunk(
  'pets/addPetToCollection',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await petService.createAsync(payload);

      if (!response?.flag) return rejectWithValue(response?.message);

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePetInfo = createAsyncThunk(
  'pets/updatePetInfo',
  async (params, { rejectWithValue }) => {
    const { petId, payload } = params;

    try {
      const response = await petService.update(petId, payload);

      if (!response.flag) return rejectWithValue(response.message);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
