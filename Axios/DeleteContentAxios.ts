import { profileDataType } from '@/Types/ProfileDataType';
import { axios } from './AxiosSetup';

export default function DeleteContentAxios(userId: number, postId: number) {
  try {
    axios({
      method: 'POST',
      url: 'api/deleteContent',
      data: {
        userId: userId,
        postId: postId,
      },
    });
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
