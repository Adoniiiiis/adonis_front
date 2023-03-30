import { axios } from './AxiosSetup';

export default function UpdateRankingAxios(
  postId: number,
  category: string,
  serverSideNewValue: number
) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/ranking',
      data: {
        postId: postId,
        category: category,
        newValue: serverSideNewValue,
      },
    });
    const isUpdating = request.then(() => {
      return false;
    });
    return isUpdating;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
