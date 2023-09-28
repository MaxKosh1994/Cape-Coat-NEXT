import axios from 'axios';

// TODO нужна типизация, any заглушка
export const dataAxios = async (
  setContent: any,
  setMessage: any,
  address: any,
  formData = undefined,
  url = undefined,
  id = undefined
): Promise<any> => {
  try {
    if (url === `create-${address}`) {
      //!POST
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}admin/${address}/${url}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const responseData: object = await response.data;
      // TODO типизация
      setMessage((prev) => responseData.message);
      setContent((prev) => [...prev, responseData.res]);

      return responseData;
    } else if (url === `delete-${address}`) {
      //!DELETE
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}admin/${address}/${url}/${id}`,
        { withCredentials: true }
      );
      const responseData: object = await response.data;
      // TODO типизация
      setContent((prev) => [...prev.filter((el) => el.id !== id)]);
      setMessage((prev) => responseData.message);
      return responseData;
    } else if (url === `update-${address}`) {
      //!PATCH
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_URL}admin/${address}/${url}/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const responseData = await response.data;
      // TODO типизация
      setContent((prev) => {
        const updatedContent = prev.map((item) => {
          if (item.id === id) {
            return {
              ...responseData.res,
              Photos: item.Photos,
            };
          } else {
            return item;
          }
        });
        return updatedContent;
      });
      // TODO типизация
      setMessage((prev) => responseData.message);
      return responseData;
    } else if (url === undefined) {
      //!GET
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}admin/${address}/read-${address}`,
        { withCredentials: true }
      );
      const responseData = await response.data;
      setContent(responseData.res);
      // setMessage((prev) => responseData.message);
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

// TODO нужна типизация, any заглушка
export const allOrderDataFetch = async (setOrder: any): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/order/allorder`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await response.json();
    setOrder(data.allOrder);
  } catch (error) {
    console.log(error);
  }
};

// TODO нужна типизация, any заглушка
export const updateOrderDataFetch = async (
  id: any,
  status: any,
  setMessage: any
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/order/update/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: status }),
      }
    );
    const data = await response.json();
    // TODO типизация
    setMessage((prev) => data.message);
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderFieldFetch = async (
  id: number,
  fieldName: string,
  fieldValue: string
): Promise<object> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}admin/order/updateOrderField/${id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ [fieldName]: fieldValue }),
    }
  );
  return await response.json();
};

export const updateOrderItemFieldFetch = async (
  id: number,
  itemId: number,
  fieldName: string,
  fieldValue: string
): Promise<object> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}admin/order/updateOrderItemField/${id}/${itemId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ [fieldName]: fieldValue }),
    }
  );
  return await response.json();
};
