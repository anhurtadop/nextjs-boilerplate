// 'use client';

import { Counter } from '@/screens/Counter';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'CounterPage' });

  return {
    title: t('page_counter'),
  };
}

const CounterPage = ({ params: { locale } }: Readonly<{ params: { locale: string } }>) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('CounterPage');

  return (
    <>
      <h1 className="text-3xl font-bold underline">{t('manually_promisified_timer')}</h1>
      <Counter />
    </>
  );
};

export default CounterPage;
