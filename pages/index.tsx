import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import HomepageFilterButtons from '@/components/HomepageFilterButtons';
import HomepageSqueletons from '@/components/HomepageSqueletons';
import { useEffect, useState } from 'react';
import getContentByCategory from '@/Axios/getContentByCategory';
import GetPopularContentAxios from '@/Axios/GetPopularContentAxios';
import GetNewContentAxios from '@/Axios/GetNewContentAxios';
import useAuth from '@/context/AuthContext';
import FilterContentResponse from '@/Axios/FilterContentResponse';
import { userType } from '@/Types/UserType';

export default function Home() {
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [totalPopularContent, setTotalPopularContent] = useState<any>(null);
  const [popularContent, setPopularContent] = useState<any>(null);
  const [totalNewContent, setTotalNewContent] = useState<any>(null);
  const [newContent, setNewContent] = useState<any>(null);
  const [totalBookContent, setTotalBookContent] = useState<any>(null);
  const [books, setBooks] = useState<any>(null);
  const [totalVideoContent, setTotalVideoContent] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [totalQuoteContent, setTotalQuoteContent] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);

  // Displaying Popular Content by Default
  useEffect(() => {
    if (!contentChosen && user.id) {
      changeContentType('popularContent');
    }
  }, []);

  function paginate(array: any[], page_size: number, page_number: number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  // Loading More Content On The Page
  const handleLoadMore = async () => {
    const newPaginatedContent: any = updatePaginatedContent();
    const newContentDisplayed = [...contentDisplayed, ...newPaginatedContent];
    setContentDisplayed(newContentDisplayed);
    storePaginatedContent(newContentDisplayed);
    setCurrentPage(currentPage + 1);
  };

  // Updating The Paginated Content When Loading More
  function updatePaginatedContent() {
    switch (contentChosen) {
      case 'popularContent':
        return paginate(totalPopularContent, 3, currentPage + 1);
      case 'newContent':
        return paginate(totalNewContent, 3, currentPage + 1);
      case 'book':
        return paginate(totalBookContent, 3, currentPage + 1);
      case 'quote':
        return paginate(totalQuoteContent, 3, currentPage + 1);
      case 'video':
        return paginate(totalVideoContent, 3, currentPage + 1);
    }
  }

  // Paginating The Received Content
  function paginateContent(filteredContent: any) {
    const paginatedContent = paginate(filteredContent, 3, currentPage);
    setContentDisplayed(paginatedContent);
    switch (contentChosen) {
      case 'popularContent':
        return (
          setTotalPopularContent(filteredContent),
          setPopularContent(paginatedContent)
        );
      case 'newContent':
        return (
          setTotalNewContent(filteredContent), setNewContent(paginatedContent)
        );
      case 'book':
        return setTotalBookContent(filteredContent), setBooks(paginatedContent);
      case 'quote':
        return (
          setTotalQuoteContent(filteredContent), setQuotes(paginatedContent)
        );
      case 'video':
        return (
          setTotalVideoContent(filteredContent), setVideos(paginatedContent)
        );
    }
  }

  // Storing The Paginated Content To Avoid Loading It Again
  function storePaginatedContent(newPaginatedContent: any[]) {
    switch (contentChosen) {
      case 'popularContent':
        return setPopularContent(newPaginatedContent);
      case 'newContent':
        return setNewContent(newPaginatedContent);
      case 'book':
        return setBooks(newPaginatedContent);
      case 'quote':
        return setQuotes(newPaginatedContent);
      case 'video':
        return setVideos(newPaginatedContent);
    }
  }

  // Getting Contents
  const getPopularContent = async () => {
    if (popularContent) {
      setContentDisplayed(popularContent);
    } else {
      const filteredContent = FilterContentResponse(
        await GetPopularContentAxios(user.id)
      );
      paginateContent(filteredContent);
    }
  };

  const getNewContent = async () => {
    if (newContent) {
      setContentDisplayed(newContent);
    } else {
      const filteredContent = FilterContentResponse(
        await GetNewContentAxios(user.id)
      );
      paginateContent(filteredContent);
    }
  };

  const getBooks = async () => {
    if (books) {
      setContentDisplayed(books);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('book', user.id)
      );
      paginateContent(filteredContent);
    }
  };

  const getQuotes = async () => {
    if (quotes) {
      setContentDisplayed(quotes);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('quote', user.id)
      );
      paginateContent(filteredContent);
    }
  };

  const getVideos = async () => {
    if (videos) {
      setContentDisplayed(videos);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('video', user.id)
      );
      paginateContent(filteredContent);
    }
  };

  // The User Chooses what Content to Display
  function changeContentType(contentTypeChosen: string) {
    setContentChosen(contentTypeChosen);
    switch (contentTypeChosen) {
      case 'popularContent':
        return getPopularContent();
      case 'newContent':
        return getNewContent();
      case 'book':
        return getBooks();
      case 'quote':
        return getQuotes();
      case 'video':
        return getVideos();
    }
  }

  return (
    <div>
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
              <HomepageFilterButtons changeContentType={changeContentType} />
              <div className="-mt-7 flex justify-center">
                <div className="flex-col">
                  {contentDisplayed ? contentDisplayed : <HomepageSqueletons />}
                  <div className="w-full flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      className="text-white p-2 bg-blue-600 mb-24 -mt-2"
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </main>
    </div>
  );
}
