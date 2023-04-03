import { axios } from './AxiosSetup';
import FilterContentResponse from './FilterContentResponse';

export default function getContentByCategory(categoryName: string) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getContentByCategory/${categoryName}`,
    });
    const response = request.then((res) =>
      FilterContentResponse(res.data.content)
    );
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
