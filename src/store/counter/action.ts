import { SagaCallback } from '@/utils/common';
import { createAction } from '@reduxjs/toolkit';
import { GET_TIME, INCREMENT, INCREMENT_ASYNC, START_TIMER } from './action-types';

export const increment = createAction<number>(INCREMENT);
export const incrementAsync = createAction<number>(INCREMENT_ASYNC);

export const startTimer = createAction<{ delayMs: number; callback: SagaCallback<string> }>(START_TIMER);

export const getCurrentTime = createAction<{ callback: SagaCallback<{ [key: string]: unknown }> }>(GET_TIME);
