import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  return {
    title: t('index_page.index_title'),
  };
}

export default function Home({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('index_page');

  return (
    <>
      <h1>{t('index_title')}</h1>
      <h2>{t('welcome')}</h2>
      <Link locale="en" href="/counter">
        {t('counter_demo')}
      </Link>
    </>
  );
}
