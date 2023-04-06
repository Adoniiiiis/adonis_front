import React, { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import StepperAddContent from '@/components/addContent/StepperAddContent';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Divider, TextField } from '@mui/material';
import CreateContent from '@/Axios/CreateContent';
import useAuth from '@/context/AuthContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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

interface FinalObject {
  category: string | null;
  author: string | null;
  title: string | null;
  quote: string | null;
  subtitle: string | null;
  link: string | null;
  tagTime: string | null;
  tagPage: string | null;
}

export default function AddContent() {
  const router = useRouter();
  const { getUser }: any = useAuth();
  const user = getUser();
  const [category, setCategory] = useState('');
  const [step, setStep] = useState(0);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [link, setLink] = useState('');
  const [tagTime, setTagTime] = useState('');
  const [tagPage, setTagPage] = useState('');
  const [loading, setLoading] = useState(false);
  const [finalObject, setFinalObject] = useState<FinalObject>({
    category: null,
    author: null,
    title: null,
    quote: null,
    subtitle: null,
    link: null,
    tagTime: null,
    tagPage: null,
  });

  const validate = () => {
    if (step === 0) {
      setFinalObject({ ...finalObject, category });
      setStep(step + 1);
    } else if (step === 1) {
      if (finalObject.category === categories[0].id) {
        setFinalObject({
          ...finalObject,
          author,
          title,
          subtitle,
          link,
          tagTime,
        });
        setStep(step + 1);
      } else if (finalObject.category === categories[1].id) {
        setFinalObject({
          ...finalObject,
          author,
          title,
          subtitle,
          quote,
        });
        setStep(step + 1);
      } else if (finalObject.category === categories[2].id) {
        setFinalObject({
          ...finalObject,
          author,
          title,
          subtitle,
          tagPage,
        });
        setStep(step + 1);
      }
    } else if (step === 2) {
      setLoading(true);
      CreateContent(user.id, finalObject)
        .then((res: any) => {
          console.log(res);
          toast.success('Votre contenu a bien été ajouté !');
          router.push('/');
        })
        .catch((err: any) => {
          console.log(err);
          toast.error(
            "Une erreur est survenue lors de l'ajout de votre contenu."
          );
        })
        .finally(() => setLoading(false));
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const displayActualStepForm = () => {
    if (step === 0) {
      return (
        <div id="step-0" className="grid grid-cols-2">
          <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
          <Select
            className="col-span-2"
            value={category}
            label="Categorie"
            onChange={handleChange}
          >
            {categories.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.displayName}
              </MenuItem>
            ))}
          </Select>
        </div>
      );
    } else if (step === 1) {
      if (finalObject.category === categories[0].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              onChange={(e) => setAuthor(e.target.value)}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              label="Titre"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setLink(e.target.value)}
              label="Url"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setSubtitle(e.target.value)}
              label="Sous-titre"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setTagTime(e.target.value)}
              label="Moment de la vidéo (timecode)"
              variant="outlined"
            />
          </div>
        );
      } else if (finalObject.category === categories[1].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              onChange={(e) => setAuthor(e.target.value)}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setQuote(e.target.value)}
              label="Citation"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setSubtitle(e.target.value)}
              label="Sous-titre"
              variant="outlined"
            />
          </div>
        );
      } else if (finalObject.category === categories[2].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              onChange={(e) => setAuthor(e.target.value)}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              label="Titre"
              variant="outlined"
              required
            />
            <TextField
              onChange={(e) => setSubtitle(e.target.value)}
              label="Sous-titre"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setTagPage(e.target.value)}
              label="Page importante"
              variant="outlined"
            />
          </div>
        );
      }
    } else if (step === 2) {
      if (finalObject.category === categories[0].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              disabled
              value={finalObject.author}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.title}
              label="Titre"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.link}
              label="Url"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.subtitle}
              className={`${finalObject.subtitle || 'opacity-50'}`}
              label="Sous-titre"
              variant="outlined"
            />
            <TextField
              disabled
              value={finalObject.tagTime}
              className={`${finalObject.tagTime || 'opacity-50'}`}
              label="Moment de la vidéo (timecode)"
              variant="outlined"
            />
          </div>
        );
      } else if (finalObject.category === categories[1].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              disabled
              value={finalObject.author}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.quote}
              label="Citation"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.subtitle}
              className={`${finalObject.subtitle || 'opacity-50'}`}
              label="Sous-titre"
              variant="outlined"
            />
          </div>
        );
      } else if (finalObject.category === categories[2].id) {
        return (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10">
            <TextField
              disabled
              value={finalObject.author}
              label="Auteur"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.title}
              label="Titre"
              variant="outlined"
              required
            />
            <TextField
              disabled
              value={finalObject.subtitle}
              className={`${finalObject.subtitle || 'opacity-50'}`}
              label="Sous-titre"
              variant="outlined"
            />
            <TextField
              disabled
              value={finalObject.tagPage}
              className={`${finalObject.tagPage || 'opacity-50'}`}
              label="Page importante"
              variant="outlined"
            />
          </div>
        );
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="h-full flex flex-col">
        <StepperAddContent step={step} />
        <div className="px-20 mt-20 h-full">
          <FormControl
            className="flex flex-col justify-between h-full"
            fullWidth
          >
            {displayActualStepForm()}
            <div className="w-full">
              <hr className="h-0.5 bg-slate-500" />
              <div className="flex gap-2 justify-end py-2">
                <Button
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                  className="bg-red-500 font-semibold"
                  color="error"
                  variant="contained"
                >
                  Retour
                </Button>
                <LoadingButton
                  disabled={
                    (step === 0 && !category) ||
                    (step === 1 &&
                      finalObject.category === categories[0].id &&
                      (!author || !title || !link)) ||
                    (step === 1 &&
                      finalObject.category === categories[1].id &&
                      (!author || !quote)) ||
                    (step === 1 &&
                      finalObject.category === categories[2].id &&
                      (!author || !title))
                  }
                  onClick={validate}
                  className="bg-green-500 hover:bg-green-700 font-semibold text-white w-44"
                  color="success"
                  variant="contained"
                  loading={loading}
                >
                  Valider
                </LoadingButton>
              </div>
            </div>
          </FormControl>
        </div>
      </div>
    </DefaultLayout>
  );
}
