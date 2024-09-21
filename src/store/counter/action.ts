import { INCREMENT, INCREMENT_ASYNC, START_TIMER } from "./action-types";
import { createAction } from "@reduxjs/toolkit";
import { SagaCallback } from "@/utils/common";

export const increment = createAction<number>(INCREMENT);
export const incrementAsync = createAction<number>(INCREMENT_ASYNC);

export const startTimer = createAction<{delayMs: number, callback: SagaCallback<string>}>(START_TIMER);

type CounterActions = ReturnType<typeof startTimer>