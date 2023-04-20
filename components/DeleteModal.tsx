import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteContentAxios from '@/Axios/DeleteContentAxios';
import { toast } from 'react-toastify';
import useContent from '@/context/ContentContext';

export default function DeleteModal({
  userId,
  postId,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: any) {
  const { removeContent } = useContent();

  const handleClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    DeleteContentAxios(userId, postId);
    removeContent(postId);
    toast.success('Post supprimé avec succès!');
  };

  return (
    <div>
      <Dialog
        open={isDeleteModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Êtes-vous sûr de supprimer ce post?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous ne pourrez plus revenir en arrière après sa suppression.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="cursor-pointer text-black">
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            className="cursor-pointer text-white bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
