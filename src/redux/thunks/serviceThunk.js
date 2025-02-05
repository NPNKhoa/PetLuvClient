import { createAsyncThunk } from '@reduxjs/toolkit';
import servicesService from '../../services/services.service';

export const getServices = createAsyncThunk(
  'services/getServices',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServices(params);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getServiceById = createAsyncThunk(
  'services/getById',
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServiceById(serviceId);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
