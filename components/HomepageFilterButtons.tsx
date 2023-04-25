import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { languageStrings } from '@/utils/languageStrings';

type changeContentType = {
  changeContentType: (contentType: string) => void;
  contentIsLoading: boolean;
  contentChosen: string | null;
};

export default function HomepageFilterButtons({
  changeContentType,
  contentIsLoading,
  contentChosen,
}: changeContentType) {
  const { push } = useRouter();
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

  const CATEGORIES: { displayName: string; id: string }[] = [
    {
      displayName: langStrings && langStrings.popular,
      id: 'popularContent',
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
    <div className="mt-8 mb-16 flex justify-between min-w-[364px] bg-white rounded-lg border-gray-400 border-[1px] p-2 w-[95vw] max-w-[800px]">
      <div>
        {CATEGORIES.map((el, i) => (
          <button
            key={el.id}
            onClick={() => {
              !contentIsLoading && changeContentType(el.id);
            }}
            className={`p-2 px-4 hover:bg-gray-200 hover:rounded-full md:text-base text-sm font-bold text-black text-opacity-80 ${
              contentChosen &&
              contentChosen === el.id &&
              'text-blue-700 text-opacity-100 bg-gray-200 rounded-full'
            }`}
          >
            {el.displayName}
          </button>
        ))}
      </div>
      <Button
        onClick={() => push('/addContent')}
        className="bg-blue-600 hover:bg-blue-700 font-semibold text-white"
        variant="contained"
        endIcon={<AddIcon />}
      >
        {langStrings && langStrings.add}
      </Button>
    </div>
  );
}
