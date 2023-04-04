import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

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
        className="bg-cyan-500 hover:bg-cyan-600 font-semibold"
        variant="contained"
        endIcon={<AddIcon />}
      >
        Ajouter
      </Button>
    </div>
  );
}
