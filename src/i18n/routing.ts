// import { getRequestConfig } from 'next-intl/server';
// import { notFound } from 'next/navigation';

// export const AppConfig = {
//   locales: ['en', 'es'],
//   defaultLocale: 'en',
// };

// // NextJS Boilerplate uses Crowdin as the localization software.
// // As a developer, you only need to take care of the English (or another default language) version.
// // Other languages are automatically generated and handled by Crowdin.

// // The localisation files are synced with Crowdin using GitHub Actions.
// // By default, there are 3 ways to sync the message files:
// // 1. Automatically sync on push to the `main` branch
// // 2. Run manually the workflow on GitHub Actions
// // 3. Every 24 hours at 5am, the workflow will run automatically

// // Using internationalization in Server Components
// export default getRequestConfig(async ({ locale }) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!AppConfig.locales.includes(locale)) {
//     notFound();
//   }

//   return {
//     messages: (await import(`../app/dictionaries/${locale}.json`)).default,
//   };
// });

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en',

  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
