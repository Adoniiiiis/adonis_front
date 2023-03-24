import { axios } from './AxiosSetup';

export default function ResetPasswordAxios(
  token: number,
  email: string,
  password: string,
  password_confirmation: string
) {
  try {
    const request = axios({
      method: 'POST',
      url: '/reset-password',
      data: {
        token: token,
        email: email,
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
