'use client';
// import { selectCounterCount } from '@/store/selectors';
// import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

const CounterNumber = () => {
  // const count = useSelector(selectCounterCount);

  return (
    <article className={styles.container}>
      <span className={styles.counter}>0</span>
    </article>
  );
};

export default CounterNumber;
