import BookCard from '@/components/BookCard';
import QuoteCard from '@/components/QuoteCard';
import VideoCard from '@/components/VideoCard';

export default function FilterContentResponse(content: any) {
  const filteredContent = Object.values(content).map((el: any, key) => {
    if (el.category === 'book') {
      return (
        <div key={key} className="-mt-5">
          <BookCard bookData={el} />
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
  return filteredContent;
}
