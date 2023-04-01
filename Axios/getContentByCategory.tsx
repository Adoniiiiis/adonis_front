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
    });
    const content = request.then((res) => res.data.content);

    if (categoryName === 'book') {
      const contentMapping = Object.values(content).map((book: any, key) => {
        return (
          <div key={key} className="-mt-5">
            <BookCard bookCoverUrl={image} bookData={book} />
          </div>
        );
      });
      return contentMapping;
    } else if (categoryName === 'quote') {
      const contentMapping = Object.values(content).map((quote: any, key) => {
        return (
          <div key={key} className="-mt-5">
            <QuoteCard quoteData={quote} />
          </div>
        );
      });
      return contentMapping;
    } else if (categoryName === 'video') {
      const contentMapping = Object.values(content).map((video: any, key) => {
        const validUrl = video.link.replace('watch?v=', 'embed/');
        const videoUrl = `${validUrl}?controls=0`;
        return (
          <div key={key} className="-mt-5">
            <VideoCard videoUrl={videoUrl} videoData={video} />
          </div>
        );
      });
      return contentMapping;
    }
  } catch (err: any) {
    const error = err.message;
    return error;
  }
}
