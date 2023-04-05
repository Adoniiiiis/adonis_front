import { userType } from './UserType';

export type registerResponseType = {
  status: string;
  message: string;
  user: userType;
};
