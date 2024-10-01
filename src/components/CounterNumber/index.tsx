'use client';

import { useTranslations } from 'next-intl';

import { selectCounterCount } from '@/store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const CounterNumber = () => {
  const count = useSelector(selectCounterCount);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const t = useTranslations('CounterPage');
  // const count = useAppSelector((state) => state.counter.counter);
  if (!isClient) {
    return null;
  }
  return (
    <article className={styles.container}>
      <span className={styles.counter}>{t('counter')}</span>
      <span className={styles.counter}>{count}</span>
    </article>
  );
};

export default CounterNumber;
