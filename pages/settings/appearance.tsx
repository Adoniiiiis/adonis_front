import DarkmodeSwitch from '@/components/Settings/DarkmodeSwitch';
import SettingsLayout from '@/layouts/SettingsLayout';
import React from 'react';

export default function Appearance() {
  return (
    <SettingsLayout>
      <>
        <div>Darkmode and Lang</div>
        <DarkmodeSwitch />
      </>
    </SettingsLayout>
  );
}
