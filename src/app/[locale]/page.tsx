import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  // const t = await getTranslations('CounterPage');
  const t = await getTranslations({ locale, namespace: 'CounterPage' });

  return {
    title: t('counter_title'),
  };
}
export default function Home({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('CounterPage');

  return <h1>{t('welcome')}</h1>;
}
