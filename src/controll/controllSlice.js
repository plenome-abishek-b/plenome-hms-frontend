import { createSlice } from '@reduxjs/toolkit';

const controllSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
        console.log("entering",state)
      state.value = !state.value;
    },
  },
});

export const { toggle } = controllSlice.actions;
export default controllSlice.reducer;
