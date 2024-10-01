import { RootState } from '.';

export const selectCounter = (state: RootState) => state.counter;
export const selectCounterCount = (state: RootState) => state.counter?.count;
