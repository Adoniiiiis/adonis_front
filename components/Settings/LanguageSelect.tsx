import React from 'react';
import { languageStrings } from '@/utils/languageStrings';

export default function LanguageSelect() {
  const handleLangChange = (e: any) => {
    languageStrings.setLanguage(`${e.target.value}`);
  };

  const langs = [
    {
      langAcronym: 'fr',
      langName: 'Français',
    },
    {
      langAcronym: 'en',
      langName: 'English',
    },
  ];

  const langsDisplay = langs.map((el, i) => {
    return (
      <option className="font-sans" value={el.langAcronym} key={i}>
        {el.langName}
      </option>
    );
  });

  return (
    <div>
      <p></p>
      <select
        className="w-[233px] h-[40px] pl-3 rounded-md dark:bg-gray-900"
        name="select"
        onChange={(e) => handleLangChange(e)}
      >
        {langsDisplay}
      </select>
    </div>
  );
}
