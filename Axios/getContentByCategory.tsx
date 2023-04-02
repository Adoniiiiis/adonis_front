import BookCard from '@/components/BookCard';
import { axios } from './AxiosSetup';
import image from '../public/images/book-cover-platon.jpg';
import QuoteCard from '@/components/QuoteCard';
import VideoCard from '@/components/VideoCard';

export default function getContentByCategory(categoryName: string) {
  try {
    const request = axios({
      method: 'GET',
      url: `api/getContentByCategory/${categoryName}`,
    }).then((res) => {
      const contentMapping = Object.values(res.data.content).map(
        (el: any, key) => {
          if (categoryName === 'book') {
            return (
              <div key={key} className="-mt-5">
                <BookCard bookCoverUrl={image} bookData={el} />
              </div>
            );
          } else if (categoryName === 'quote') {
            return (
              <div key={key} className="-mt-5">
                <QuoteCard quoteData={el} />
              </div>
            );
          } else if (categoryName === 'video') {
            const validUrl = el.link.replace('watch?v=', 'embed/');
            const videoUrl = `${validUrl}?controls=0`;
            return (
              <div key={key} className="-mt-5">
                <VideoCard videoUrl={videoUrl} videoData={el} />
              </div>
            );
          }
        }
      );
      return contentMapping;
    });
    return request;
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
