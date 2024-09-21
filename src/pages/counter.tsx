import { FC } from "react";
import Head from "next/head";

import { Counter } from "@/screens/Counter";

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

export default CounterPage;

export async function getServerSideProps({ req, res } : any) {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
   
    return {
      props: {},
    }
  }