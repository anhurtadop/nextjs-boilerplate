import { useCallback, useState } from 'react';
import { increment, startTimer } from '@/store/counter/action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCounterCount } from '@/store/selectors';
import { ExtractCallbackType, promisifiedCallback } from '@/utils/common';

export function Counter() {
    const count = useSelector(selectCounterCount);
    const dispatch = useDispatch();

    const [timerBusy, setTimerBusy] = useState(false)
    const timerHandler = useCallback(async () => {
      const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof startTimer>>()
      setTimerBusy(true);
      const actionPackage = startTimer({delayMs: 3000, callback});
      console.log('ACTION PACKAGE', actionPackage)
      dispatch(actionPackage)
      const response = await promise;
      setTimerBusy(false);
      if (response.ok) {
        console.log(response, response.data)
      }
    }, [])

  return (
    <div>
      <div>
        {/* <button onClick={() => dispatch(decrement())}>-</button> */}
        <span>{count}</span>
        <button onClick={() => dispatch(increment(count))}>+</button>
        {/* <button onClick={() => dispatch(incrementAsync())}>Increment Async</button> */}
      </div>
      <div>
        <button onClick={timerHandler}>Start Timer</button>
        <span>Timer { timerBusy ? 'Running' : 'Stopped' }</span>
      </div>
    </div>
  );
}
