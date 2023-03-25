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

    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
