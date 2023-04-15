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
import { useDispatch } from 'react-redux';
import useBookmark from '@/context/BookmarkContext';

export default function Home() {
  const content = {
    popularContent: [],
    newContent: [],
    books: [],
    quotes: [],
    videos: [],
  };

  const { addToBookmarks } = useBookmark();
  const { getUser }: any = useAuth();
  const user: userType = getUser();
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalContent, setTotalContent] = useState<any>(content);
  const [paginatedContent, setPaginatedContent] = useState<any>(content);
  const [filteredContent, setFilteredContent] = useState<any>(null);
  const [contentIsLoading, setContentIsLoading] = useState<boolean>(false);

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
      case 'books':
        return paginate(totalContent.books, 3, page);
      case 'quotes':
        return paginate(totalContent.quotes, 3, page);
      case 'videos':
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
  function handleReceivedContent() {
    setTotalContent({ ...totalContent, [contentChosen]: filteredContent });
    if (filteredContent.length <= 3) {
      storeLoadedContent(filteredContent);
      setContentIsLoading(false);
      setContentDisplayed(filteredContent);
    } else {
      const paginatedContent: any = paginate(filteredContent, 3, currentPage);
      storeLoadedContent(paginatedContent);
      setContentIsLoading(false);
      setContentDisplayed(paginatedContent);
    }
  }

  useEffect(() => {
    filteredContent && handleReceivedContent();
  }, [filteredContent]);

  // Getting Content
  const getPopularContent = async () => {
    if (paginatedContent.popularContent.length > 0) {
      setContentDisplayed(paginatedContent.popularContent);
    } else {
      setContentIsLoading(true);
      const data = await GetPopularContentAxios(user.id);
      const newBookmarks: any = [];
      data.map((el: any) => {
        el.isBookmarked && newBookmarks.push(el);
      });
      addToBookmarks(newBookmarks);
      setFilteredContent(FilterContentResponse(data));
    }
  };

  const getNewContent = async () => {
    if (paginatedContent.newContent.length > 0) {
      setContentDisplayed(paginatedContent.newContent);
    } else {
      const data = await GetNewContentAxios(user.id);
      const newBookmarks: any = [];
      data.map((el: any) => {
        el.isBookmarked && newBookmarks.push(el);
      });
      setFilteredContent(FilterContentResponse(data));
    }
  };

  const getBooks = async () => {
    if (paginatedContent.books.length > 0) {
      setContentDisplayed(paginatedContent.books);
    } else {
      const data = await getContentByCategory('book', user.id);
      const newBookmarks: any = [];
      data.map((el: any) => {
        el.isBookmarked && newBookmarks.push(el);
      });
      setFilteredContent(FilterContentResponse(data));
    }
  };

  const getQuotes = async () => {
    if (paginatedContent.quotes.length > 0) {
      setContentDisplayed(paginatedContent.quotes);
    } else {
      const data = await getContentByCategory('quote', user.id);
      const newBookmarks: any = [];
      data.map((el: any) => {
        el.isBookmarked && newBookmarks.push(el);
      });
      setFilteredContent(FilterContentResponse(data));
    }
  };

  const getVideos = async () => {
    if (paginatedContent.videos.length > 0) {
      setContentDisplayed(paginatedContent.videos);
    } else {
      const data = await getContentByCategory('video', user.id);
      const newBookmarks: any = [];
      data.map((el: any) => {
        el.isBookmarked && newBookmarks.push(el);
      });
      setFilteredContent(FilterContentResponse(data));
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
                      onClick={handleLoadMore}
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
