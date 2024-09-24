/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
  output: 'standalone',
  reactStrictMode: true,
};

module.exports = nextConfig;
