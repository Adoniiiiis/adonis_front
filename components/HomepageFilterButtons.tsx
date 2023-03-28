import React from 'react';

export default function HomepageFilterButtons({
  changeContentType,
  clickable,
}: any) {
  console.log(clickable);
  return (
    <div className="mt-8 mb-16 bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[700px]">
      <button
        onClick={() => {
          if (clickable) {
            changeContentType('popular');
          }
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Populaires
      </button>

      <button
        onClick={() => {
          if (clickable) {
            changeContentType('newContent');
          }
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Nouveaux
      </button>

      <button
        onClick={() => {
          if (clickable) {
            changeContentType('books');
          }
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Livres
      </button>

      <button
        onClick={() => {
          if (clickable) {
            changeContentType('videos');
          }
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Vidéos
      </button>

      <button
        onClick={() => {
          if (clickable) {
            changeContentType('quotes');
          }
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Citations
      </button>
    </div>
  );
}
