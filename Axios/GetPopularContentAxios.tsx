import { axios } from './AxiosSetup';

export default function GetPopularContentAxios(userId: number) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getPopularContent/${userId}`,
    });
    const response = request.then((res) => res.data.content);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
