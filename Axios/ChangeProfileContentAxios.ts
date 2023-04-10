import { profileDataType } from '@/Types/ProfileDataType';
import { axios } from './AxiosSetup';

export default function ChangeProfileContentAxios(
  profileData: profileDataType
) {
  try {
    axios({
      method: 'POST',
      url: 'api/changeProfile',
      data: {
        profileData: profileData,
      },
    });
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
