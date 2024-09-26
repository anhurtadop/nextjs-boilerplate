// import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { FC } from 'react';

import { Counter } from '@/screens/Counter';

const CounterPage: FC = () => {
  // const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Counter </title>
      </Head>
      <Counter />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps<any> = async () => ({
//   props: {
//     ...(await serverSideTranslations('en', ['common'])),
//   },
// });

export default CounterPage;
