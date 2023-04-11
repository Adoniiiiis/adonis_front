import { languageStrings } from '@/utils/languageStrings';
import { useEffect, useState } from 'react';

export default function useLang() {
  const [langStrings, setLangStrings] = useState<any>(null);

  useEffect(() => {
    setLangStrings(languageStrings);
  }, [languageStrings]);

  return langStrings && langStrings;
}
