import { axios } from './AxiosSetup';
import FilterContentResponse from './FilterContentResponse';

export default function GetBookmarkedContentAxios(userId: number) {
  const request = axios({
    method: 'GET',
    url: `/api/bookmarks/${userId}`,
  });
  const response = request.then((res) =>
    FilterContentResponse(res.data.content)
  );
  return response;
}
