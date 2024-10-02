'use client';
import { useTranslations } from 'next-intl';

import CounterNumber from '@/components/CounterNumber';
import { PlusLessCounter } from '@/components/PlusLessCounter';
import styles from './styles.module.scss';

export async function Counter() {
  const t = useTranslations('counter_page');

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>{t('counter')}</h2>
      <section>
        <CounterNumber />
        <PlusLessCounter />
      </section>
    </article>
  );
}
