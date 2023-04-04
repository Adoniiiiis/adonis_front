import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import StepperAddContent from '@/components/addContent/StepperAddContent';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const categories = [
  {
    displayName: 'Vidéos',
    id: 'video',
  },
  {
    displayName: 'Citations',
    id: 'quote',
  },
  {
    displayName: 'Livres',
    id: 'book',
  },
];

export default function AddContent() {
  const [category, setCategory] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <DefaultLayout>
      <>
        <StepperAddContent />
        <div className="px-20">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <Select value={category} label="Age" onChange={handleChange}>
              {categories.map((el) => (
                <MenuItem key={el.id} value={el.id}>
                  {el.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </>
    </DefaultLayout>
  );
}
