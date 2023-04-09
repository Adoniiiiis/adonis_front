import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { languageStrings } from '@/utils/languageStrings';

type changeContentType = {
  changeContentType: (contentType: string) => void;
};

export default function HomepageFilterButtons({
  changeContentType,
}: changeContentType) {
  const { push } = useRouter();
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

  const CATEGORIES: { displayName: string; id: string }[] = [
    {
      displayName: langStrings && langStrings.popular,
      id: 'popular',
    },
    {
      displayName: langStrings && langStrings.new,
      id: 'newContent',
    },
    {
      displayName: langStrings && langStrings.books,
      id: 'books',
    },
    {
      displayName: langStrings && langStrings.videos,
      id: 'videos',
    },
    {
      displayName: langStrings && langStrings.quotes,
      id: 'quotes',
    },
  ];

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
        {langStrings && langStrings.add}
      </Button>
    </div>
  );
}
