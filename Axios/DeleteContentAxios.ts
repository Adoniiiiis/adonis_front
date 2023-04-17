import { axios } from './AxiosSetup';

export default function DeleteContentAxios(userId: number, postId: number) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/deleteContent',
      data: {
        userId: userId,
        postId: postId,
      },
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
