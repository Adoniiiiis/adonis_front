import { contentType } from '@/Types/ContentType';
import React, { createContext, useState, useContext, useEffect } from 'react';

type ContentContextType = {
  contentData: contentType;
  setContentData: any;
  updateBookmark: (id: number) => void;
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

  function updateBookmark(id: any) {
    Object.entries(contentData).map((el: any) => {
      if (el[1].length > 0) {
        const updatedData = el[1].map((content: any) => {
          if (content.id === id) {
            if (content.isBookmarked) {
              return { ...content, isBookmarked: false };
            } else {
              return { ...content, isBookmarked: true };
            }
          } else {
            return content;
          }
        });
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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default function useContent() {
  return useContext(ContentContext);
}
