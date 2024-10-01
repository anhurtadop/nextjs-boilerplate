import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
