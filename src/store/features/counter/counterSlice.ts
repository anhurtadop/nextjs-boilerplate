import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  counter: number;
};

const initialState: CounterState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter -= action.payload;
    },
    reset: (state) => {
      state.counter = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmount, reset } = counterSlice.actions;

export default counterSlice.reducer;
