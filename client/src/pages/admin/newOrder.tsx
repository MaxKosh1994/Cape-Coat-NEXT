import FormAddOrder from '@/components/Admin/FormAddOrder/FormAddOrder';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import React from 'react';

export default function newOrder() {
  return (
    <>
      <NavAdminComp />
      <FormAddOrder />
    </>
  );
}
