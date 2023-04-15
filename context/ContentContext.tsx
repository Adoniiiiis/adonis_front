import React, { createContext, useState, useContext } from 'react';

type ContentContextType = {
  totalContent: any;
  setTotalContent: any;
  paginatedContent: any;
  setPaginatedContent: any;
  updateBookmark: (id: any) => void;
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
    setTotalContent(
      totalContent.map((content: any) => {
        if (content.id === id) {
          if (content.isBookmarked) {
            return { ...content, isBookmarked: true };
          } else {
            return { ...content, isBookmarked: false };
          }
        } else {
          return content;
        }
      })
    );
    setPaginatedContent(
      paginatedContent.map((content: any) => {
        if (content.id === id) {
          if (content.isBookmarked) {
            return { ...content, isBookmarked: true };
          } else {
            return { ...content, isBookmarked: false };
          }
        } else {
          return content;
        }
      })
    );
  }

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
