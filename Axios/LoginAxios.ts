import { axios } from './AxiosSetup';

export default function LoginAxios(email: string, password: string) {
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
}
