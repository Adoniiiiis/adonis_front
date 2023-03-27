import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import BookCard from '@/components/BookCard';
import image from '../public/images/book-cover-platon.jpg';
import VideoCard from '@/components/VideoCard';
import QuoteCard from '@/components/QuoteCard';
import { useEffect, useState } from 'react';
import HomepageFilterButtons from '@/components/HomepageFilterButtons';
import { Skeleton } from '@mui/material';
import GetPopularContentAxios from '@/Axios/GetPopularContentAxios';
import GetFilteredContentAxios from '@/Axios/GetFilteredContentAxios';
import GetNewContentAxios from '@/Axios/GetNewContentAxios';

export default function Home() {
  const [popular, setPopular] = useState<any>(null);
  const [books, setBooks] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [isFilteredContentLoading, setIsFilteredContentLoading] =
    useState<boolean>(true);
  const [isNewContentLoading, setIsNewContentLoading] = useState<boolean>(true);
  const [isPopularContentLoading, setIsPopularContentLoading] =
    useState<boolean>(true);
  const [filterButtons, setFilterButtons] = useState<any>(null);
  const [newContent, setNewContent] = useState<any>(null);

  // Filtering by Popular, Book, Video or Quote
  const changeContentType = (contentType: string) => {
    if (popular) {
      switch (contentType) {
        case 'books':
          return setContentDisplayed(books);
        case 'videos':
          return setContentDisplayed(videos);
        case 'quotes':
          return setContentDisplayed(quotes);
        case 'newContent':
          return setContentDisplayed(newContent);
        case 'popular':
          return setContentDisplayed(popular);
      }
    }
  };

  useEffect(() => {
    popular && setContentDisplayed(popular);
  }, [popular]);

  // Setting Buttons to Filter by Popular, Book, Video or Quote
  useEffect(() => {
    if (
      isFilteredContentLoading &&
      isNewContentLoading &&
      isPopularContentLoading
    ) {
      setFilterButtons(
        <HomepageFilterButtons
          changeContentType={changeContentType}
          clickable={false}
        />
      );
    } else {
      setFilterButtons(
        <HomepageFilterButtons
          changeContentType={changeContentType}
          clickable={true}
        />
      );
    }
  }, [isFilteredContentLoading, isNewContentLoading, isPopularContentLoading]);

  function getSqueletonDisplay() {
    let squeletonDisplay = [];
    for (let i = 0; i < 4; i++) {
      squeletonDisplay.push(
        <div key={i} className="mb-8 -mt-5">
          <Skeleton
            variant="rectangular"
            width={700}
            height={200}
            className="rounded-lg"
          />
        </div>
      );
    }
    return squeletonDisplay;
  }

  // Getting Popular Content
  useEffect(() => {
    if (isPopularContentLoading) {
      GetPopularContentAxios().then((res: any) => {
        setPopular(
          Object.values(res.contentData).map((el: any, key) => {
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
          })
        );
        setIsPopularContentLoading(false);
      });
    }

    // Filtering Books, Quotes and Videos
    if (isFilteredContentLoading) {
      GetFilteredContentAxios().then((res: any) => {
        setBooks(
          Object.values(res.books).map((book: any, key) => {
            return (
              <div key={key} className="-mt-5">
                <BookCard bookCoverUrl={image} bookData={book} />
              </div>
            );
          })
        );
        setQuotes(
          Object.values(res.quotes).map((quote: any, key) => {
            return (
              <div key={key} className="-mt-5">
                <QuoteCard quoteData={quote} />
              </div>
            );
          })
        );
        setVideos(
          Object.values(res.videos).map((video: any, key) => {
            const validUrl = video.link.replace('watch?v=', 'embed/');
            const videoUrl = `${validUrl}?controls=0`;
            return (
              <div key={key} className="-mt-5">
                <VideoCard videoUrl={videoUrl} videoData={video} />
              </div>
            );
          })
        );
        setIsFilteredContentLoading(false);
      });
    }

    // Getting New Content
    if (isNewContentLoading) {
      GetNewContentAxios().then((res: any) => {
        setNewContent(
          Object.values(res.contentData).map((el: any, key) => {
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
          })
        );
        setIsNewContentLoading(false);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout>
          <div className="flex justify-center">
            <div className="flex-col">
              {filterButtons}
              <div className="-mt-10">
                {contentDisplayed ? contentDisplayed : getSqueletonDisplay()}
              </div>
            </div>
          </div>
        </DefaultLayout>
      </main>
    </>
  );
}
