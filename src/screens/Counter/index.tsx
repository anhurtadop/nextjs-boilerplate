import { useTranslation } from 'next-i18next';

import CounterNumber from '@/components/CounterNumber';
import { PlusLessCounter } from '@/components/PlusLessCounter';
import styles from './styles.module.scss';

export function Counter() {
  const { t } = useTranslation();

  return (
    <article className={styles.container}>
      <section className={styles.title}>{t('counter')}</section>
      <section>
        <CounterNumber />
        <PlusLessCounter />
      </section>
    </article>
  );
}
