import { axios } from './AxiosSetup';

export default function GetProfileImgAxios(userId: number) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getProfileImg/${userId}`,
    });
    const response = request.then((res) => res.data.profile_img);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
