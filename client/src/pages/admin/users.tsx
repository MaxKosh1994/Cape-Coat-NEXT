import { fetchUsersData } from '@/api/getAllUsers';
import OneUserComp from '@/components/Admin/oneUserComp/OneUserComp';
import { IUser } from '@/components/accComp/orders/types';
import NavAdminComp from '@/components/navAdminComp/NavAdminComp';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/admin/UsersAdmin.module.css';

export default function Users() {
  const [usersArr, setUsersArr] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await fetchUsersData();
      console.log('=====allUsers====>>>>>>>>>>>>', allUsers);
      setUsersArr(allUsers);
    };

    getUsers();
  }, []);

  return (
    <>
      <NavAdminComp />
      <div className={styles.mainContainer}>
        {usersArr?.map((user) => (
          <OneUserComp key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
