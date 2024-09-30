'use client';

import { useTranslations } from 'next-intl';

import { useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const CounterNumber = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const t = useTranslations('CounterPage');
  const count = useAppSelector((state) => state.counter.counter);
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
