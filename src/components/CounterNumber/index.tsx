import { selectCounterCount } from '@/store/selectors';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

const CounterNumber = () => {
  const count = useSelector(selectCounterCount);

  return (
    <article className={styles.container}>
      <span className={styles.counter}>{count}</span>
    </article>
  );
};

export default CounterNumber;
