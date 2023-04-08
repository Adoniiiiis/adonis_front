import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

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
  const { push } = useRouter();

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
      <Button
        onClick={() => push('/addContent')}
        className="bg-cyan-500 hover:bg-cyan-600 font-semibold text-white"
        variant="contained"
        endIcon={<AddIcon />}
      >
        Ajouter
      </Button>
    </div>
  );
}
