export const getAllPromo = async () => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/promo/getAll`
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

export const createPromo = async (text: string, percent: number) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/promo/createPromo`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, percent }),
      }
    );
    const { status } = responseFetch;
    const response = await responseFetch.json();

    if (status !== 200) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updatePromo = async (
  id: number,
  code: string,
  percent: number
) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/promo/updatePromo/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, percent }),
      }
    );
    const { status } = responseFetch;
    const response = await responseFetch.json();

    if (status !== 200) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deletePromo = async (id: number) => {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}admin/promo/deletePromo/${id}`,
      {
        method: 'DELETE',
      }
    );
    const { status } = responseFetch;
    const response = await responseFetch.json();

    if (status !== 200) {
      throw new Error(response.message);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};
