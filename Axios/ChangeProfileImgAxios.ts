import { axios } from './AxiosSetup';

export default function ChangeProfileImgAxios(userId: number, profileImg: any) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/changeProfileImg',
      headers: {
        Accept: 'application/json, text-plain',
        'Content-Type': 'multipart/form-data',
      },
      data: {
        userId,
        profileImg,
      },
    });
    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
