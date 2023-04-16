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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadMoreBtnDisabled, setIsLoadMoreBtnDisabled] = useState(true);
  const [contentChosen, setContentChosen] = useState<any>(null);

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
  function storeReceivedContent(data: any, contentChosen: string) {
    setTotalContent({ ...totalContent, [contentChosen]: data });
    const newPaginatedData = paginate(data, 3, currentPage);
    setPaginatedContent({
      ...paginatedContent,
      [contentChosen]: newPaginatedData,
    });
  }

  // Loading More Content On The Page
  const LoadMoreContent = async () => {
    let totalLength: any = null;
    Object.entries(totalContent).map((el: any) => {
      if (el[0] === contentChosen) {
        return (totalLength = el[1].length);
      }
    });
    if (totalLength) {
      const newContent: any = getMorePaginatedContent();
      const newFilteredContent = FilterContentResponse(newContent);
      const newContentDisplayed = [...contentDisplayed, ...newFilteredContent];
      setPaginatedContent({
        ...paginatedContent,
        [contentChosen]: newContentDisplayed,
      });
      setContentDisplayed(newContentDisplayed);
      setCurrentPage(currentPage + 1);
      checkIfEnoughContentToLoadMore(totalLength, contentDisplayed.length + 3);
    }
  };

  // Paginate more content
  function getMorePaginatedContent() {
    let newContent: any = null;
    Object.entries(totalContent).map((el: any) => {
      if (el[0] === contentChosen) {
        return (newContent = paginate(el[1], 3, currentPage + 1));
      }
    });
    if (newContent) {
      return newContent;
    }
  }

  function checkIfEnoughContentToLoadMore(
    totalLength: number,
    paginatedLength: number
  ) {
    totalLength - paginatedLength >= 3
      ? setIsLoadMoreBtnDisabled(false)
      : setIsLoadMoreBtnDisabled(true);
  }

  const getPageContent = async (contentChosen: string) => {
    let totalContentData: any = null;
    Object.entries(totalContent).map((el) => {
      if (el[0] === contentChosen && el[1].length > 0) {
        return (totalContentData = el[1]);
      }
    });

    if (totalContentData && totalContentData.length > 0) {
      const paginatedContentData = paginate(totalContentData, 3, 1);
      setContentDisplayed(FilterContentResponse(paginatedContentData));
      checkIfEnoughContentToLoadMore(
        totalContentData.length,
        paginatedContentData.length
      );
    } else {
      setContentIsLoading(true);
      let data: any = null;
      if (contentChosen === 'popularContent') {
        data = await GetPopularContentAxios(user.id);
      } else if (contentChosen === 'newContent') {
        data = await GetNewContentAxios(user.id);
      } else {
        data = await getContentByCategory(contentChosen, user.id);
      }
      storeReceivedContent(data, contentChosen);
      const firstPaginatedContent: any = paginate(data, 3, 1);
      setContentDisplayed(FilterContentResponse(firstPaginatedContent));
      checkIfEnoughContentToLoadMore(data.length, firstPaginatedContent.length);
      setContentIsLoading(false);
    }
  };

  // The User Chooses what Content to Display
  function changeContentType(contentTypeChosen: string) {
    setContentChosen(contentTypeChosen);
    setCurrentPage(1);
    getPageContent(contentTypeChosen);
  }

  useEffect(() => {
    console.log(totalContent);
  }, [totalContent]);

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
                      disabled={contentIsLoading || isLoadMoreBtnDisabled}
                      onClick={LoadMoreContent}
                      className={`text-white p-2 bg-blue-600 mb-24 -mt-2 ${
                        contentIsLoading || isLoadMoreBtnDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'opacity-100 cursor-pointer'
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
