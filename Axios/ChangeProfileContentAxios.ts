import { profileDataType } from '@/Types/ProfileDataType';
import { axios } from './AxiosSetup';

export default function ChangeProfileContentAxios(
  profileData: profileDataType
) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/changeProfile',
      data: {
        profileData: profileData,
      },
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
