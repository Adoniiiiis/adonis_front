import { axios } from './AxiosSetup';

export default function UpdateRankingAxios(
  postId: number,
  category: string,
  note: number
) {
  try {
    const request = axios({
      method: 'POST',
      url: '/ranking',
      data: {
        postId: postId,
        category: category,
        note: note,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
