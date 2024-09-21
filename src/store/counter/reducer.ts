import { createSlice } from '@reduxjs/toolkit';
import { incrementAsync } from './action';

const initialState = {
   count: 0,
};

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(incrementAsync, (state, {payload}) => {
      return {
        ...state,
        count: payload
      }
    })
}})

export default counter.reducer;