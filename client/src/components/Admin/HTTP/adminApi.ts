import axios from 'axios';

export const formDataIteamAxios = async (
  formData: object,
  setMessage
): Promise<object> => {
  try {
    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}admin/items/additem`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    const responseData: object = await response.data;
    setMessage((prev) => responseData.message);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const formDataCategoryAxios = async (
  formData: object,
  setMessage
): Promise<object> => {
  try {
    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}admin/category/addcategory`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    const responseData: object = await response.data;
    console.log(responseData);
    setMessage((prev) => responseData.message);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const formDataCollectionAxios = async (
  formData: object,
  setMessage
): Promise<object> => {
  try {
    const response: any = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}admin/collection/addcollection`,
      formData,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    const responseData: object = await response.data;
    setMessage((prev) => responseData.message);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const categoryDataFetch = async (
  setCategory,
  setMessage
): Promise<object> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/category/allcategory`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await response.json();

    const responseData = await data.allCategory.map((el) => {
      setCategory((prev) => [...prev, el]);
    });
    setMessage((prev) => data.message);
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const collectionDataFetch = async (
  setCollection,
  setMessage
): Promise<object> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/collection/allcollection`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const data = await response.json();
    const responseData = await data.allcollection.map((el) => {
      setCollection((prev) => [...prev, el]);
    });
    setMessage((prev) => data.message);
    return responseData;
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
