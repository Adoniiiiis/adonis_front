import { Button } from '@mui/material';
<<<<<<< HEAD
import AddIcon from '@mui/icons-material/Add';
=======
>>>>>>> f636452200a5c6eedbf34bc33750fd0a24a90acf
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

<<<<<<< HEAD
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
=======
export default function HomepageFilterButtons({ filterContent }: any) {
  const { push } = useRouter();

  return (
    <div className="mb-16 flex justify-between bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[700px]">
      <div>
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
      <Button
        onClick={() => push('/addContent')}
        className="bg-cyan-500 hover:bg-cyan-600 font-semibold text-white"
        variant="contained"
        endIcon={<AddIcon />}
      >
>>>>>>> f636452200a5c6eedbf34bc33750fd0a24a90acf
        Ajouter
      </Button>
    </div>
  );
}
