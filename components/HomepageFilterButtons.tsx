import React from 'react';

export default function HomepageFilterButtons({ filterContent }: any) {
  return (
    <div className="mt-8 mb-16 bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[700px]">
      <button
        onClick={() => {
          filterContent('popularContent');
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Populaires
      </button>

      <button
        onClick={() => {
          filterContent('newContent');
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Nouveaux
      </button>

      <button
        onClick={() => {
          filterContent('book');
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Livres
      </button>

      <button
        onClick={() => {
          filterContent('video');
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Vidéos
      </button>

      <button
        onClick={() => {
          filterContent('quote');
        }}
        className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
      >
        Citations
      </button>
    </div>
  );
}
