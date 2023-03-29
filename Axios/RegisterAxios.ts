import { RegisterType } from '@/Types/RegisterType';
import { axios } from './AxiosSetup';

export default function RegisterAxios(data: RegisterType) {
  const { name, email, username, password, confirm_password } = data;
  try {
    const request = axios({
      method: 'POST',
      url: '/register',
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
        confirm_password: confirm_password,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
