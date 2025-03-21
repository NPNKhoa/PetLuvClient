import { createSlice } from '@reduxjs/toolkit';
import { getRoomById, getRooms } from '../thunks/roomThunk';

const initialState = {
  rooms: [],
  room: {},
  selectedRooms: [],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setSelectedRoom: (state, action) => {
      const room = action.payload;

      if (!state.selectedRooms?.includes(room)) {
        state.selectedRooms.push(room);
      }
    },

    resetSelectedRoom: (state) => {
      state.selectedRooms = [];
    },
  },
  extraReducers: (builder) => {
    // Get All
    builder
      .addCase(getRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get By Id
    builder
      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomById.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomSlice.reducer;

export const { setSelectedRoom, resetSelectedRoom } = roomSlice.actions;
