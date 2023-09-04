export const getAllItems = async () => {
  try {
    const responseFetch = await fetch(`
			  ${process.env.NEXT_PUBLIC_URL}item/allItems`);
    const { status } = await responseFetch;
    const response = await responseFetch.json();
    if (status !== 200) {
      throw new Error(response.message);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
