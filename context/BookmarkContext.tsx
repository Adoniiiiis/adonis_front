import React, { createContext, useState, useContext } from 'react';

type BookmarkContextType = {
  bookmarks: any;
  removeFromBookmarks: (contentId: any) => void;
  addToBookmarks: (contentData: any) => void;
};

const BookmarkContext = createContext({} as BookmarkContextType);

export const BookmarkProvider = ({ children }: any) => {
  const [bookmarks, setBookmarks] = useState<any>([]);

  function addToBookmarks(content: any) {
    setBookmarks([...bookmarks, ...content]);
  }

  function removeFromBookmarks(contentId: any) {}

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addToBookmarks,
        removeFromBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default function useBookmark() {
  return useContext(BookmarkContext);
}
