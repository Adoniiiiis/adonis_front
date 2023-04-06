import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
type changeContentType = {
  changeContentType: (contentType: string) => void;
};

export default function HomepageFilterButtons({
  changeContentType,
}: changeContentType) {
  return (
    <div className="mt-8 mb-16 flex justify-between bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[700px]">
      <div>
        {CATEGORIES.map((el) => (
          <button
            key={el.id}
            onClick={() => {
              changeContentType(el.id);
            }}
            className="mr-4 p-2 hover:bg-gray-400 hover:rounded-full"
          >
            {el.displayName}
          </button>
        ))}
      </div>
      <Button variant="outlined" startIcon={<AddIcon />}>
        Ajouter
      </Button>
    </div>
  );
}
