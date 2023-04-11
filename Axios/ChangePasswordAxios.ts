import { axios } from './AxiosSetup';

export default function ChangePasswordAxios(
  userId: number,
  password: string,
  password_confirmation: string
) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/change-password',
      data: {
        userId: userId,
        password: password,
        password_confirmation: password_confirmation,
      },
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
