'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCounterCount } from '@/store/selectors';
import styles from './styles.module.scss';

const CounterNumber = () => {
  const count = useSelector(selectCounterCount);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <article className={styles.container}>
      <span className={styles.counter}>{count}</span>
    </article>
  );
};

export default CounterNumber;
