import { promisifiedCallback, SagaCallback } from '@/utils/common';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

type ActionWithCallback<ActionType extends string, DispatchData extends { [key: string]: unknown }, ReturnData> = (
  payload: DispatchData & { callback: SagaCallback<ReturnData> }
) => {
  type: ActionType;
  payload: typeof payload;
};

/**
 * Gives a way to await a saga action and get the returned value with a simple await,
 * useful when the data doesn't need to be put in the redux store (though it can be), and just want local access
 * */
function useAwaitableSagaAction<ActionType extends string, DispatchData extends { [key: string]: unknown }, ReturnData>(
  action: ActionWithCallback<ActionType, DispatchData, ReturnData>
) {
  const dispatch = useDispatch();
  const [busy, setBusy] = useState(false);
  const dispatchAction = useCallback(
    async (
      data: keyof Omit<Parameters<typeof action>[0], 'callback'> extends never
        ? void
        : Omit<Parameters<typeof action>[0], 'callback'>
    ) => {
      const { callback, promise } = promisifiedCallback<ReturnData>();
      setBusy(true);
      // @ts-ignore -- There's an issue with DispatchData typing here, but its fine for now.
      dispatch(action({ ...data, callback }));
      const response = await promise;
      setBusy(false);
      return response;
    },
    [dispatch, action]
  );
  return { dispatchAction, busy };
}

export default useAwaitableSagaAction;
