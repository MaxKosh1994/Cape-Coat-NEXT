// api.ts
import { IUserInfo } from '../profile/userDataTypes';
import { IInputsEditInfo } from './types';

export async function editUserInfo(
  inputsUserInfo: IInputsEditInfo,
  userInfo: IUserInfo,
  setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setInfo: React.Dispatch<React.SetStateAction<string>>
) {
  try {
    const responseFetch = await fetch(
      `${process.env.NEXT_PUBLIC_URL}account/profile/editInfo`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(inputsUserInfo),
      }
    );
    const response = await responseFetch.json();
    const { status } = await responseFetch;

    if (status === 403 || status === 404 || status === 500) {
      setInfo(response.message);
    }

    if (status === 200) {
      setInfo(response.message);
      setUserInfo({ ...userInfo, ...inputsUserInfo });
      setTimeout(() => {
        setOpen(false);
        setInfo('');
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}
