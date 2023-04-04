import { axios } from './AxiosSetup';
import FilterContentResponse from './FilterContentResponse';

export default function getContentByCategory(
  categoryName: string,
  userId: number
) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getContentByCategory/${categoryName}/${userId}`,
    });
    const response = request.then((res) => res.data.content);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
