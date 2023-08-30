export const getAllMaterials = async (itemId: number) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/items/allMaterials/${itemId}`
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

export const createOrderFetch = async (data) => {
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
