import FormAddOrder from '@/components/Admin/FormAddOrder/FormAddOrder';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import Head from 'next/head';
import React from 'react';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function newOrder() {
  const isAdmin = useSelector((state: RootState) => state.sessionSlice.isAdmin);

  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/signin');
    }
  }, [isAdmin]);

  return (
    <>
      {isAdmin && (
        <>
          <Head>
            <meta name='robots' content='noindex,nofollow' />
          </Head>
          <NavAdminComp />
          <FormAddOrder />
        </>
      )}
    </>
  );
}
