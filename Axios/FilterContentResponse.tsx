import BookCard from '@/components/BookCard';
import QuoteCard from '@/components/QuoteCard';
import VideoCard from '@/components/VideoCard';

export default function FilterContentResponse(content: any) {
  const filteredContent = Object.values(content).map((el: any) => {
    if (el.category === 'book') {
      return (
        <div key={el.id} className="-mt-5 flex justify-center">
          <BookCard data={el} />
        </div>
      );
    } else if (el.category === 'quote') {
      return (
        <div key={el.id} className="-mt-5 flex justify-center">
          <QuoteCard data={el} />
        </div>
      );
    } else if (el.category === 'video') {
      const validUrl = el.link.replace('watch?v=', 'embed/');
      const videoUrl = `${validUrl}?controls=0`;
      return (
        <div key={el.id} className="-mt-5 flex justify-center">
          <VideoCard videoUrl={videoUrl} data={el} />
        </div>
      );
    }
  });
  return filteredContent;
}
