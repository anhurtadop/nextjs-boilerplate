import { getTranslations } from 'next-intl/server';

import { Counter } from '@/screens/Counter';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  return {
    title: t('counter_page.counter_title'),
  };
}

const CounterPage = () => {
  return (
    <>
      <Counter />;
    </>
  );
};

export default CounterPage;
