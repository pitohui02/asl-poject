import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/modals.module.css';

import axios from 'axios';
import { Resident } from '../containers/ResidentContainer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type DeleteProps = {
  residentId: number;
  residentDetails: Resident;
  closeParentModal?: any;
};

export default function DeleteIconModal({
  residentId,
  residentDetails,
  closeParentModal,
}: DeleteProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    closeParentModal();
  };

  function handleDeleteResident() {
    axios.delete(`${process.env.apiUrl}/resident/${residentId}`, {
      headers: {
        Authorization: localStorage.getItem('jwt'),
      },
    });
    handleClose();
    closeParentModal();
  }

  function handleCancel() {
    handleClose();
    closeParentModal();
  }

  return (
    <div>
      <Button
        id={`${residentId}`}
        onClick={handleOpen}
        variant="contained"
        className={styles.buttondesign}
      >
        {/* <ModeEditOutlineIcon className={styles.actionbuttons} /> */}
        DELETE RECORD
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.deletecenterscreen}>
          <Typography className={styles.deletemodaltext}>
            Remove{' '}
            {`${residentDetails?.lastName}, ${residentDetails?.firstName} ${residentDetails?.middleName[0]}.`}{' '}
            from the records?
          </Typography>
          <Box className={styles.deleteBtngroup}>
            <Button onClick={handleCancel} className={styles.buttondesign}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteResident}
              color="error"
              variant="contained"
              sx={{ width: '200px' }}
              // className={styles.buttondesign}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
