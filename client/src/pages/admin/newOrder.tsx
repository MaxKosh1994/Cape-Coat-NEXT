import FormAddOrder from '@/components/Admin/FormAddOrder/FormAddOrder';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import Head from 'next/head';
import React from 'react';

export default function newOrder() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <NavAdminComp />
      <FormAddOrder />
    </>
  );
}
