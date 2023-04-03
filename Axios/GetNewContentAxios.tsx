import { axios } from './AxiosSetup';
import FilterContentResponse from './FilterContentResponse';

export default function GetNewContentAxios(userId: number) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getNewContent/${userId}`,
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
