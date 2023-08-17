export const fetchNavigationMenuData = async () => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}catalog/categories`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const response = await responseFetch.json();
    const { status } = await responseFetch;

    if (status === 403 || status === 402 || status === 203 || status === 500) {
      return { info: response.message, orders: [] };
    }

    if (status === 200 && Array.isArray(response)) {
      return { info: '', orders: response };
    }

    return { info: 'Unknown status', orders: [] };
  } catch (error) {
    console.log(error);
    return { info: 'Error occurred', orders: [] };
  }
};
