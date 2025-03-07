import { createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/booking.service';

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await bookingService.createBooking(payload);

      if (!response?.flag) {
        return rejectWithValue(response.message);
      }

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
