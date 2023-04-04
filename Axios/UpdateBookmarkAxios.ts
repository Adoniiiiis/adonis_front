import { axios } from './AxiosSetup';

export default function UpdateBookmarkAxios(postId: number, userId: number) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/updateBookmark',
      data: {
        postId: postId,
        userId: userId,
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
