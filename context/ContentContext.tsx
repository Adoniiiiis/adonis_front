import { contentType } from '@/Types/ContentType';
import React, { createContext, useState, useContext, useEffect } from 'react';

type ContentContextType = {
  contentData: contentType;
  setContentData: any;
  updateBookmark: (id: number) => void;
  removeContent: (postId: number) => void;
};

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

  function updateBookmark(id: number) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].map((post: any) => {
          if (post.id === id) {
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

  function removeContent(postId: number) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].filter((post: any) => post.id != postId);
        updatedData && setContentData({ ...contentData, [el[0]]: updatedData });
      }
    });
  }

  return (
    <ContentContext.Provider
      value={{
        contentData,
        setContentData,
        updateBookmark,
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
