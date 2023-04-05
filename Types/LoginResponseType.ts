import { userType } from './UserType';

export type loginResponseType = {
  user: userType;
  status: string;
  message: string;
  access_token: string;
};
