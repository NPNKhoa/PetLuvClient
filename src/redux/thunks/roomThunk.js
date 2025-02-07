import { createAsyncThunk } from '@reduxjs/toolkit';
import roomService from '../../services/room.service';

export const getRooms = createAsyncThunk(
  'rooms/getRooms',
  async (params, { rejectWithValue }) => {
    try {
      const response = await roomService.getAllRooms(params);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getRoomById = createAsyncThunk(
  'rooms/getRoomById',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await roomService.getRoomById(roomId);

      if (!response.flag) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
