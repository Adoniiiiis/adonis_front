import { axios } from './AxiosSetup';

type dataType = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  terms: boolean;
};

export default function RegisterAxios(data: dataType) {
  const { name, email, username, password, confirm_password, terms } = data;
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
        isTermsChecked: terms,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
