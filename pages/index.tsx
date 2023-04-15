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
import HomepageSpinner from '@/components/HomepageSpinner';
import useContent from '@/context/ContentContext';

export default function Home() {
  const {
    totalContent,
    setTotalContent,
    paginatedContent,
    setPaginatedContent,
  } = useContent();
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const [contentIsLoading, setContentIsLoading] = useState<boolean>(false);
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Displaying Popular Content by Default And Setting Bookmarks
  useEffect(() => {
    !contentChosen && user.id && changeContentType('popularContent');
  }, []);

  // Getting Paginated Content For A Given Page
  function paginate(content: any[], page_size: number, page_number: number) {
    if (content.length >= 3) {
      return content.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    } else {
      return content;
    }
  }

  // Store Received Content In Content Context
  function storeReceivedContent(data: any) {
    setTotalContent({ ...totalContent, [contentChosen]: data });
    const paginatedContent = paginate(data, 3, currentPage);
    setPaginatedContent({
      ...paginatedContent,
      [contentChosen]: data,
    });
    setContentIsLoading(false);
  }

  // Loading More Content On The Page
  const LoadMoreContent = async () => {
    const newPaginatedContent: any = getMorePaginatedContent();
    const newContentDisplayed = [...contentDisplayed, ...newPaginatedContent];
    setContentDisplayed(newContentDisplayed);
    setCurrentPage(currentPage + 1);
  };

  // Paginate more content
  function getMorePaginatedContent() {
    switch (contentChosen) {
      case 'popularContent':
        return paginate(totalContent.popularContent, 3, currentPage + 1);
      case 'newContent':
        return paginate(totalContent.newContent, 3, currentPage + 1);
      case 'books':
        return paginate(totalContent.books, 3, currentPage + 1);
      case 'quotes':
        return paginate(totalContent.quotes, 3, currentPage + 1);
      case 'videos':
        return paginate(totalContent.videos, 3, currentPage + 1);
    }
  }

  // Getting Content
  const getPopularContent = async () => {
    if (paginatedContent.popularContent.length > 0) {
      setContentDisplayed(
        FilterContentResponse(paginatedContent.popularContent)
      );
    } else {
      setContentIsLoading(true);
      const data = await GetPopularContentAxios(user.id);
      storeReceivedContent(data);
      setContentDisplayed(FilterContentResponse(data));
    }
  };

  const getNewContent = async () => {
    if (paginatedContent.newContent.length > 0) {
      setContentDisplayed(FilterContentResponse(paginatedContent.newContent));
    } else {
      setContentIsLoading(true);
      const data = await GetNewContentAxios(user.id);
      storeReceivedContent(data);
      setContentDisplayed(FilterContentResponse(data));
    }
  };

  const getBooks = async () => {
    if (paginatedContent.books.length > 0) {
      setContentDisplayed(FilterContentResponse(paginatedContent.books));
    } else {
      setContentIsLoading(true);
      const data = await getContentByCategory('book', user.id);
      storeReceivedContent(data);
      setContentDisplayed(FilterContentResponse(data));
    }
  };

  const getQuotes = async () => {
    if (paginatedContent.quotes.length > 0) {
      setContentDisplayed(FilterContentResponse(paginatedContent.quotes));
    } else {
      setContentIsLoading(true);
      const data = await getContentByCategory('quote', user.id);
      storeReceivedContent(data);
      setContentDisplayed(FilterContentResponse(data));
    }
  };

  const getVideos = async () => {
    if (paginatedContent.videos.length > 0) {
      setContentDisplayed(FilterContentResponse(paginatedContent.videos));
    } else {
      setContentIsLoading(true);
      const data = await getContentByCategory('video', user.id);
      storeReceivedContent(data);
      setContentDisplayed(FilterContentResponse(data));
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
      case 'books':
        return getBooks();
      case 'quotes':
        return getQuotes();
      case 'videos':
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
              <HomepageFilterButtons
                changeContentType={changeContentType}
                contentIsLoading={contentIsLoading}
              />
              <div className="-mt-7 flex justify-center">
                <div className="flex-col">
                  {contentDisplayed && !contentIsLoading ? (
                    contentDisplayed
                  ) : contentDisplayed ? (
                    <HomepageSpinner />
                  ) : (
                    <HomepageSqueletons />
                  )}
                  <div className="w-full flex justify-center">
                    <button
                      disabled={contentIsLoading ? true : false}
                      onClick={LoadMoreContent}
                      className={`text-white p-2 bg-blue-600 mb-24 -mt-2 ${
                        contentIsLoading && 'opacity-50'
                      }`}
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
