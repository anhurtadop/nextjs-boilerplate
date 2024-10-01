'use client';
import { decrement, increment } from '@/store/counter/action';
import { selectCounterCount } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

export function PlusLessCounter() {
  const dispatch = useDispatch();
  const count = useSelector(selectCounterCount);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => dispatch(decrement(count))}>
        -
      </button>
      <button className={styles.button} onClick={() => dispatch(increment(count))}>
        +
      </button>
    </div>
  );
}
