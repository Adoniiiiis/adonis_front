import { axios } from './AxiosSetup';

export default function CreateContent(userId: number, finalObject: any) {
  try {
    const request = axios({
      method: 'POST',
      url: 'api/content',
      headers: {
        Accept: 'application/json, text-plain',
        'Content-Type': 'multipart/form-data',
      },
      data: {
        userId,
        finalObject,
      },
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
