import { axios } from './AxiosSetup';

export default function GetBookmarkedContentAxios(userId: number) {
  const request = axios({
    method: 'GET',
    url: `/api/bookmarks/${userId}`,
  });
  const response = request.then((res) => res.data.content);
  return response;
}
