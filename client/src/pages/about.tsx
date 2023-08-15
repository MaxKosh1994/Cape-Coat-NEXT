import AboutComp from '@/components/About/AboutComp';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const DynamicMap = dynamic(() => import('@/components/About/Map'), {
  ssr: false,
});

export default function About() {
  return (
    <>
      <Head>
        <title>Cape&Coat | О нас</title>
        <meta name="title" content="Cape and Coat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutComp />
      {/* <DynamicMap /> */}
    </>
  );
}
