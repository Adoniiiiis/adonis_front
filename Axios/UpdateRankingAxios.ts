import { axios } from './AxiosSetup';

export default function UpdateRankingAxios(
  postId: number,
  category: string,
  newRanking: number
) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/ranking',
      data: {
        postId: postId,
        category: category,
        note: newRanking,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
