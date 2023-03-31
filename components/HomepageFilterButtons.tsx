import React from 'react';

const CATEGORIES: { displayName: string; id: string }[] = [
  {
    displayName: 'Populaires',
    id: 'popular',
  },
  {
    displayName: 'Nouveaux',
    id: 'newContent',
  },
  {
    displayName: 'Livres',
    id: 'books',
  },
  {
    displayName: 'Vidéos',
    id: 'videos',
  },
  {
    displayName: 'Citations',
    id: 'quotes',
  },
];

export default function HomepageFilterButtons({
  changeContentType,
  clickable,
}: any) {
  return (
    <div className="mt-8 mb-16 bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[700px]">
      {CATEGORIES.map((el) => (
        <button
          key={el.id}
          onClick={() => {
            if (clickable) {
              changeContentType(el.id);
            }
          }}
          className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
        >
          {el.displayName}
        </button>
      ))}
    </div>
  );
}
