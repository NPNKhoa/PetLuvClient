import { createAsyncThunk } from '@reduxjs/toolkit';
import servicesService from '../../services/services.service';

export const getServices = createAsyncThunk(
  'services/getServices',
  async (pageSize = 10, { rejectWithValue }) => {
    try {
      const response = await servicesService.getServices(pageSize);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  }
);
