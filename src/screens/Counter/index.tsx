import useAwaitableSagaAction from '@/hooks/useAwaitableSagaAction';
import { increment, startTimer } from '@/store/counter/action';
import { selectCounterCount } from '@/store/selectors';
import { ExtractCallbackType, promisifiedCallback } from '@/utils/common';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Counter() {
  const count = useSelector(selectCounterCount);
  const dispatch = useDispatch();

  /** Manually promisifying a saga action call and awaiting its response */
  const [timerBusy, setTimerBusy] = useState(false);
  const timerHandler = useCallback(async () => {
    const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof startTimer>>();
    setTimerBusy(true);
    dispatch(startTimer({ delayMs: 3000, callback }));
    const response = await promise;
    setTimerBusy(false);
    if (response.ok) {
      console.log('Manual handling response', response, response.data);
    }
  }, []);

  /** Using useAwaitableSagaAction hook to await a saga action */
  const { dispatchAction: startTimerAction, busy: timerHookBusy } = useAwaitableSagaAction(startTimer);
  const timerHandlerHook = useCallback(async () => {
    const response = await startTimerAction({ delayMs: 3000 });
    if (response.ok) {
      console.log('Hook response', response, response.data);
    }
  }, []);

  return (
    <div>
      <div>
        {/* <button onClick={() => dispatch(decrement())}>-</button> */}
        <span>{count}</span>
        <button onClick={() => dispatch(increment(count))}>+</button>
        {/* <button onClick={() => dispatch(incrementAsync())}>Increment Async</button> */}
      </div>
      <div>
        <button onClick={timerHandler} disabled={timerBusy}>
          Start Timer
        </button>
        <span>Manually Promisified Timer {timerBusy ? 'Running' : 'Stopped'}</span>
      </div>
      <div>
        <button onClick={timerHandlerHook} disabled={timerBusy}>
          Start Timer
        </button>
        <span>Hook Promisified Timer {timerHookBusy ? 'Running' : 'Stopped'}</span>
      </div>
    </div>
  );
}
