import { profileDataType } from '@/Types/ProfileDataType';
import { axios } from './AxiosSetup';

export default function ChangeUserThemeAxios(
  userId: number,
  themeChosen: string
) {
  try {
    axios({
      method: 'POST',
      url: 'api/changeUserTheme',
      data: {
        userId: userId,
        themeChosen: themeChosen,
      },
    });
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
