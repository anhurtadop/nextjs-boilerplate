import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Counter } from '@/screens/Counter';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  return {
    title: t('counter_page.counter_title'),
  };
}

const CounterPage = ({ params: { locale } }: Readonly<{ params: { locale: string } }>) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('counter_page');

  return (
    <>
      <h1>{t('counter_title')}</h1>
      <Counter />;
    </>
  );
};

export default CounterPage;
