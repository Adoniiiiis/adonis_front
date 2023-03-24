import { axios } from './AxiosSetup';

export default function ForgotPasswordAxios(email: string) {
  try {
    const request = axios({
      method: 'POST',
      url: '/forgot-password',
      data: {
        email: email,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
