// import { useTranslation } from 'next-i18next';
// 'use client';
import CounterNumber from '@/components/CounterNumber';
import { PlusLessCounter } from '@/components/PlusLessCounter';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
export async function Counter() {
  const t = useTranslations('CounterPage');
  return (
    <article className={styles.container}>
      <section className={styles.title}>{t('counter_title')}</section>
      <section>
        <CounterNumber />
        <PlusLessCounter />
      </section>
    </article>
  );
}
