import PromocodeComp from '@/components/Admin/PromocodeComp/PromocodeComp';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function promo() {
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
          <NavAdminComp />
          <PromocodeComp />
        </>
      )}
    </>
  );
}
