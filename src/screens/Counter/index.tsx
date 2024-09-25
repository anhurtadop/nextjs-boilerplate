import CounterNumber from '@/components/CounterNumber';
import { PlusLessCounter } from '@/components/PlusLessCounter';
import { startTimer } from '@/store/counter/action';
import { ExtractCallbackType, promisifiedCallback } from '@/utils/common';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

export function Counter() {
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

  return (
    <div className={styles.contain}>
      <div>{t('welcome')}</div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={timerHandler} disabled={timerBusy}>
          {t('start_timer')}
        </button>
        <span>
          {t('manually_promisified_timer')} {timerBusy ? 'Running' : 'Stopped'}
        </span>
      </div>
      <div>
        <CounterNumber />
        <PlusLessCounter />
      </div>
    </div>
  );
}
