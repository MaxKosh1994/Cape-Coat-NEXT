export const getAllMaterials = async (itemId: number) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/material/getallmaterials/${itemId}`,
      {
        credentials: 'include',
      }
    );
    const { status } = await responseFetch;
    const response = await responseFetch.json();

    if (status !== 200) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

// TODO типизировать data нормально, any как заглушка
export const createOrderFetch = async (data: any) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/order/createOrder`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );
    const { status } = await responseFetch;
    const response = await responseFetch.json();

    if (status !== 200) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};
