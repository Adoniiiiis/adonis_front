import { axios } from './AxiosSetup';

export default function getContentByCategory(categoryName: string) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getContentByCategory/${categoryName}`,
    });

    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
