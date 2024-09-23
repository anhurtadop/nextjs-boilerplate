import { Counter } from '@/screens/Counter';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { FC } from 'react';

const CounterPage: FC = () => {
  return (
    <>
      <Head>
        <title>Counter | Boilerplate</title>
      </Head>
      <Counter />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<any> = async () => ({
  props: {
    ...(await serverSideTranslations('en', ['common'])),
  },
});

export default CounterPage;
