import { contentType } from '@/Types/ContentType';
import React, { createContext, useState, useContext, useEffect } from 'react';

type ContentContextType = {
  totalContent: contentType;
  setTotalContent: any;
  paginatedContent: contentType;
  setPaginatedContent: any;
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
  const [totalContent, setTotalContent] = useState<any>(content);
  const [paginatedContent, setPaginatedContent] = useState<any>(content);

  function updateBookmark(id: any) {
    Object.entries(totalContent).map((el: any) => {
      if (el[1].length > 0) {
        const newContent = el[1].map((content: any) => {
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
        newContent && setTotalContent({ ...totalContent, [el[0]]: newContent });
      }
    });
    Object.entries(paginatedContent).map((el: any) => {
      if (el[1].length > 0) {
        const newContent = el[1].map((content: any) => {
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
        newContent &&
          setPaginatedContent({ ...paginatedContent, [el[0]]: newContent });
      }
    });
  }

  useEffect(() => {
    console.log(paginatedContent);
  }, [paginatedContent]);

  return (
    <ContentContext.Provider
      value={{
        totalContent,
        setTotalContent,
        paginatedContent,
        setPaginatedContent,
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
