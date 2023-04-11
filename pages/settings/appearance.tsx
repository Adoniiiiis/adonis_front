import DarkmodeSwitch from '@/components/Settings/DarkmodeSwitch';
import LanguageSelect from '@/components/Settings/LanguageSelect';
import SettingsLayout from '@/layouts/SettingsLayout';
import React from 'react';

export default function Appearance() {
  return (
    <SettingsLayout>
      <div className="flex flex-col">
        <DarkmodeSwitch />
        <div className="mt-3">
          <LanguageSelect />
        </div>
      </div>
    </SettingsLayout>
  );
}
