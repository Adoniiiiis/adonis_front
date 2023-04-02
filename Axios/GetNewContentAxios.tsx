import BookCard from '@/components/BookCard';
import QuoteCard from '@/components/QuoteCard';
import VideoCard from '@/components/VideoCard';
import { axios } from './AxiosSetup';
import image from '../public/images/book-cover-platon.jpg';

export default function GetNewContentAxios() {
  try {
    const request = axios({
      method: 'GET',
      url: 'api/getNewContent',
    }).then((res: any) => {
      const response = Object.values(res.data.content).map((el: any, key) => {
        if (el.category === 'book') {
          return (
            <div key={key} className="-mt-5">
              <BookCard bookCoverUrl={image} bookData={el} />
            </div>
          );
        } else if (el.category === 'quote') {
          return (
            <div key={key} className="-mt-5">
              <QuoteCard quoteData={el} />
            </div>
          );
        } else if (el.category === 'video') {
          const validUrl = el.link.replace('watch?v=', 'embed/');
          const videoUrl = `${validUrl}?controls=0`;
          return (
            <div key={key} className="-mt-5">
              <VideoCard videoUrl={videoUrl} videoData={el} />
            </div>
          );
        }
      });
      return response;
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
