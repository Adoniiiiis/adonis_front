import React from 'react';

export default function HomepageFilterButtons({
  changeContentType,
  clickable,
}: any) {
  return (
    <div className="mt-8 mb-16">
      <button
        onClick={() => clickable === true && changeContentType('popular')}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Populaires
      </button>
      <button
        onClick={() => clickable === true && changeContentType('books')}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Livres
      </button>
      <button
        onClick={() => clickable === true && changeContentType('videos')}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Vidéos
      </button>
      <button
        onClick={() => clickable === true && changeContentType('quotes')}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Citations
      </button>
    </div>
  );
}
