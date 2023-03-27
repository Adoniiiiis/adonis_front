import { axios } from './AxiosSetup';

export default function GetContentDataAxios() {
  try {
    const request = axios({
      method: 'GET',
      url: 'api/contentData',
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
