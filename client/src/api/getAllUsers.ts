import { DataUsersResponse } from '@/components/accComp/orders/types';

export const fetchUsersData = async (): Promise<DataUsersResponse> => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/users/all`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const response = await responseFetch.json();
    const { status } = await responseFetch;

    console.log('response============>>>>>', response);

    const allUsers = response.allUsers;

    if (status === 200 && Array.isArray(response.allUsers)) {
      return allUsers;
      console.log(allUsers);
    }
  } catch (error) {
    console.log(error);
  }
};
