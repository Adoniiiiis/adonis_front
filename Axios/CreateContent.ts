import { axios } from './AxiosSetup';

export default function CreateContent(userId: number, finalObject: object) {
  console.log(userId, finalObject);
  try {
    const request = axios({
      method: 'POST',
      url: 'api/content',
      data: {
        userId,
        finalObject,
      },
    });

    const response = request.then((res) => res.data);
    return response;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
