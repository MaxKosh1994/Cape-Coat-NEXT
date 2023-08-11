export default async function fetchUserInfo() {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}account/profile/info`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const response = await responseFetch.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
