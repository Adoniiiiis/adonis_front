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
  const content = {
    popularContent: [],
    newContent: [],
    books: [],
    quotes: [],
    videos: [],
  };

  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalContent, setTotalContent] = useState<any>(content);
  const [paginatedContent, setPaginatedContent] = useState<any>(content);

  // Displaying Popular Content by Default
  useEffect(() => {
    if (!contentChosen && user.id) {
      changeContentType('popularContent');
    }
  }, []);

  function paginate(content: any[], page_size: number, page_number: number) {
    return content.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  }

  // Loading More Content On The Page
  const handleLoadMore = async () => {
    const newPaginatedContent: any = loadPaginatedContent(currentPage + 1);
    const newContentDisplayed = [...contentDisplayed, ...newPaginatedContent];
    setContentDisplayed(newContentDisplayed);
    storeLoadedContent(newContentDisplayed);
    setCurrentPage(currentPage + 1);
  };

  // Getting Paginated Content For A Given Page
  function loadPaginatedContent(page: number) {
    switch (contentChosen) {
      case 'popularContent':
        return paginate(totalContent.popularContent, 3, page);
      case 'newContent':
        return paginate(totalContent.newContent, 3, page);
      case 'book':
        return paginate(totalContent.books, 3, page);
      case 'quote':
        return paginate(totalContent.quotes, 3, page);
      case 'video':
        return paginate(totalContent.videos, 3, page);
    }
  }

  // Storing Currently Loaded Content To Avoid Loading It Again
  function storeLoadedContent(newPaginatedContent: any) {
    setPaginatedContent({
      ...paginatedContent,
      [contentChosen]: newPaginatedContent,
    });
  }

  // Displaying And Storing Received Content
  useEffect(() => {
    const paginatedContent: any = loadPaginatedContent(currentPage);
    setContentDisplayed(paginatedContent);
    storeLoadedContent(paginatedContent);
  }, [totalContent]);

  // Getting Content
  const getPopularContent = async () => {
    if (paginatedContent.popularContent.length > 0) {
      setContentDisplayed(paginatedContent.popularContent);
    } else {
      const filteredContent = FilterContentResponse(
        await GetPopularContentAxios(user.id)
      );
      setTotalContent({ ...totalContent, popularContent: filteredContent });
    }
  };

  const getNewContent = async () => {
    if (paginatedContent.newContent) {
      setContentDisplayed(paginatedContent.newContent);
    } else {
      const filteredContent = FilterContentResponse(
        await GetNewContentAxios(user.id)
      );
      setTotalContent({ ...totalContent, newContent: filteredContent });
    }
  };

  const getBooks = async () => {
    if (paginatedContent.books) {
      setContentDisplayed(paginatedContent.books);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('book', user.id)
      );
      setTotalContent({ ...totalContent, books: filteredContent });
    }
  };

  const getQuotes = async () => {
    if (paginatedContent.quotes) {
      setContentDisplayed(paginatedContent.quotes);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('quote', user.id)
      );
      setTotalContent({ ...totalContent, quotes: filteredContent });
    }
  };

  const getVideos = async () => {
    if (paginatedContent.videos) {
      setContentDisplayed(paginatedContent.videos);
    } else {
      const filteredContent = FilterContentResponse(
        await getContentByCategory('video', user.id)
      );
      setTotalContent({ ...totalContent, videos: filteredContent });
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
