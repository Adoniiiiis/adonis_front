import { axios } from './AxiosSetup';

export default function UpdateRankingAxios(
  postId: number,
  userId: number,
  serverSideNewValue: number
) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/ranking',
      data: {
        postId: postId,
        userId: userId,
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
