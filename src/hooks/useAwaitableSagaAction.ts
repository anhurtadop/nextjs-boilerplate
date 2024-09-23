import { promisifiedCallback, SagaCallback } from '@/utils';
import { createAction } from '@reduxjs/toolkit';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export type SagaCallback<DataType = void, CallbackReturnType = unknown> = (args: {
  ok: boolean;
  message?: string;
  data?: DataType;
}) => CallbackReturnType;

type ActionWithCallback<ActionType extends string, DispatchData extends { [key: string]: unknown }, ReturnData> = (
  data: DispatchData,
  callback: SagaCallback<ReturnData>
) => ReturnType<typeof createAction<DispatchData & { callback: SagaCallback<ReturnData> }, ActionType>>;

/** Gives a way to await a saga action and get the returned value with a simple await */
function useAwaitableSagaAction<ActionType extends string, DispatchData, ReturnData>(
  action: ActionWithCallback<ActionType, DispatchData, ReturnData>
) {
  const dispatch = useDispatch();
  const dispatchAction = useCallback(
    async (data: Parameters<typeof action>[0]) => {
      const { callback, promise } = promisifiedCallback<ReturnData>();
      dispatch(action(data, callback));
      const response = await promise;
      return response;
    },
    [dispatch, action]
  );
  return useMemo(() => ({ dispatchAction }), [dispatchAction]);
}

export default useAwaitableSagaAction;
