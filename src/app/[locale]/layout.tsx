import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { Providers } from '@/store/provider';
import { geistMono, geistSans } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'NextJS Boilerplate',
  description: 'Boilerplate for a App with NextJS 14',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const language = locale || 'en';
  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
