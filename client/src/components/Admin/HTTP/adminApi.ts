import axios from 'axios';

export const dataAxios = async (
  setContent,
  setMessage,
  address,
  formData = undefined,
  url = undefined,
  id = undefined
): Promise<object> => {
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
      setMessage((prev) => responseData.message);
      return responseData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const allOrderDataFetch = async (setOrder): Promise<object> => {
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

export const updateOrderDataFetch = async (
  id,
  status,
  setMessage
): Promise<object> => {
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
