import { contentType } from '@/Types/ContentType';
import React, { createContext, useState, useContext, useEffect } from 'react';

type ContentContextType = {
  contentData: contentType;
  setContentData: any;
  updateBookmark: (postId: number) => void;
  updateRanking: (postId: number, newValue: number) => void;
  addCreatedContent: (content: { category: string }) => void;
  removeContent: (postId: number) => void;
};

interface postType {
  id: number;
  isBookmarked: boolean;
}

const ContentContext = createContext({} as ContentContextType);

export const ContentProvider = ({ children }: any) => {
  const content = {
    popularContent: [],
    newContent: [],
    books: [],
    quotes: [],
    videos: [],
  };
  const [contentData, setContentData] = useState<any>(content);

  function updateBookmark(postId: number) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].map((post: postType) => {
          if (post.id === postId) {
            if (post.isBookmarked) {
              return { ...post, isBookmarked: false };
            } else {
              return { ...post, isBookmarked: true };
            }
          } else {
            return post;
          }
        });
        updatedData && setContentData({ ...contentData, [el[0]]: updatedData });
      }
    });
  }

  function updateRanking(postId: number, newValue: number) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].map((post: postType) => {
          if (post.id === postId) {
            return { ...post, ranking: newValue };
          } else {
            return post;
          }
        });
        if (updatedData) {
          const sortedUpdatedData = updatedData.sort(
            (a: { ranking: number }, b: { ranking: number }) =>
              b.ranking - a.ranking
          );
          sortedUpdatedData &&
            setContentData({ ...contentData, [el[0]]: sortedUpdatedData });
        }
      }
    });
  }

  function addCreatedContent(content: { category: string }) {
    addToPopular(content);
    addToNew(content);
    addToCategories(content);
  }

  function addToPopular(content: {}) {
    Object.entries(contentData).map((el: any) => {
      if (el[0] === 'popularContent') {
        if (el[1].length > 0) {
          const newData = [...contentData.popularContent, content];
          const newSortedData = newData.sort(
            (a: { ranking: number }, b: { ranking: number }) =>
              b.ranking - a.ranking
          );
          setContentData((currentState: any) => {
            return { ...currentState, popularContent: newSortedData };
          });
        }
      }
    });
  }

  function addToNew(content: {}) {
    Object.entries(contentData).map((el: any) => {
      if (el[0] === 'newContent') {
        if (el[1].length > 0) {
          setContentData((currentState: any) => {
            return {
              ...currentState,
              newContent: [content, ...currentState.newContent],
            };
          });
        }
      }
    });
  }

  function addToCategories(content: { category: string }) {
    Object.entries(contentData).map((el: any) => {
      if (el[0] === content.category) {
        if (el[1].length > 0) {
          if (el[0] === 'books') {
            setContentData((currentState: any) => {
              return {
                ...currentState,
                [el[0]]: [...contentData.books, content],
              };
            });
          } else if (el[0] === 'quotes') {
            setContentData((currentState: any) => {
              return {
                ...currentState,
                [el[0]]: [...contentData.quotes, content],
              };
            });
          } else if (el[0] === 'videos') {
            setContentData((currentState: any) => {
              return {
                ...currentState,
                [el[0]]: [...contentData.videos, content],
              };
            });
          }
        }
      }
    });
  }

  function removeContent(postId: number) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].filter((post: any) => post.id != postId);
        updatedData && setContentData({ ...contentData, [el[0]]: updatedData });
      }
    });
  }

  useEffect(() => {
    console.log(contentData);
  }, [contentData]);

  return (
    <ContentContext.Provider
      value={{
        contentData,
        setContentData,
        updateBookmark,
        updateRanking,
        addCreatedContent,
        removeContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default function useContent() {
  return useContext(ContentContext);
}
