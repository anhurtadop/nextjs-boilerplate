'use client';
import { useAppDispatch } from '@/store/hooks';

import { decrement, increment } from '@/store/features/counter/counterSlice';
import styles from './styles.module.scss';

export function PlusLessCounter() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => dispatch(decrement())}>
        -
      </button>
      <button className={styles.button} onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
}
