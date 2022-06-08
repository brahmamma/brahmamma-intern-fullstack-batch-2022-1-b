import { createSlice } from '@reduxjs/toolkit';
export const driverSlice= createSlice({
  name: 'driver',
  initialState: {
    count:9
  },
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});
export const { increment, decrement, reset } = driverSlice.actions;
export default driverSlice.reducer;
