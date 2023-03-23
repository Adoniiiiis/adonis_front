import { axios } from './AxiosSetup';

export default function LoginAxios(email: string, password: string) {
  try {
    const request = axios({
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
