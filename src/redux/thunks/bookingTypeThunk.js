import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingTypeService from '../../services/bookingType.service';

export const getBookingTypes = createAsyncThunk(
  'bookingTypes/getBookings',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await bookingTypeService.getAll(payload);

      if (!response?.flag) {
        if (response?.statusCode === 404) return; // Don't toast this error

        return rejectWithValue(response.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
