import { createSlice } from '@reduxjs/toolkit';
import { decrementAsync, incrementAsync } from './action';

const initialState = {
  count: 0,
};

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(incrementAsync, (state) => {
      return {
        ...state,
        count: state.count + 1,
      };
    });
    builder.addCase(decrementAsync, (state) => {
      return {
        ...state,
        count: state.count - 1,
      };
    });
  },
});

export default counter.reducer;
