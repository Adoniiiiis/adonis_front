import { axios } from './AxiosSetup';
import FilterContentResponse from './FilterContentResponse';

export default function GetPopularContentAxios(userId: number) {
  try {
    const request = axios({
      method: 'GET',
      url: 'api/getPopularContent',
      data: {
        userId: userId,
      },
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
