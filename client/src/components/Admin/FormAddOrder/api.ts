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
