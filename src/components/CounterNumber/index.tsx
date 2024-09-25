import { selectCounterCount } from '@/store/selectors';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const CounterNumber = () => {
  const count = useSelector(selectCounterCount);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <span className={styles.counter}>{t('counter')}</span>
      <span>{count}</span>
    </div>
  );
};

export default CounterNumber;
