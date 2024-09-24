import useAwaitableSagaAction from '@/hooks/useAwaitableSagaAction';
import { getCurrentTime, increment, startTimer } from '@/store/counter/action';
import { selectCounterCount } from '@/store/selectors';
import { ExtractCallbackType, promisifiedCallback } from '@/utils/common';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Counter() {
  const count = useSelector(selectCounterCount);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  /** Manually promisifying a saga action call and awaiting its response */
  const [timerBusy, setTimerBusy] = useState(false);
  const timerHandler = async () => {
    const { callback, promise } = promisifiedCallback<ExtractCallbackType<typeof startTimer>>();
    setTimerBusy(true);
    dispatch(startTimer({ delayMs: 3000, callback }));
    const response = await promise;
    setTimerBusy(false);
    if (response.ok) {
      console.log('Manual handling response', response, response.data);
    }
  };

  /** Using useAwaitableSagaAction hook to await a saga action */
  const { dispatchAction: dispatchGetCurrentTime, busy: getTimeBusy } = useAwaitableSagaAction(getCurrentTime);
  const [currentTime, setCurrentTime] = useState('');
  const getTimeHandler = async () => {
    const response = await dispatchGetCurrentTime();
    if (response.ok) {
      setCurrentTime(JSON.stringify(response.data ?? ''));
    }
  };

  return (
    <div>
      <div>
        {/* <button onClick={() => dispatch(decrement())}>-</button> */}
        <span>{count}</span>
        <button onClick={() => dispatch(increment(count))}>+</button>
        {/* <button onClick={() => dispatch(incrementAsync())}>Increment Async</button> */}
        {t('welcome')}
      </div>
      <div>
        <button onClick={timerHandler} disabled={timerBusy}>
          Start Timer
        </button>
        <span>Manually Promisified Timer {timerBusy ? 'Running' : 'Stopped'}</span>
      </div>
      <div>
        <button onClick={getTimeHandler} disabled={getTimeBusy}>
          Get Current Time
        </button>
        <span>{currentTime}</span>
      </div>
    </div>
  );
}
