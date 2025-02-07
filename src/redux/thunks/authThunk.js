import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);
