import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/drawer.module.css';
import Registration from '@/pages/registration';
import PrintRequestForm from '../PrintRequestForm';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Resident } from '../ResidentContainer';

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
};

export default function DeleteIconModal({
  residentId,
  residentDetails,
}: DeleteProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDeleteResident() {
    axios.delete(`${process.env.apiUrl}/resident/${residentId}`);
    handleClose();
  }

  return (
    <div>
      <IconButton id={`${residentId}`} onClick={handleOpen}>
        <CloseIcon className={styles.actionbuttons} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            Remove{' '}
            {`${residentDetails?.lastName}, ${residentDetails?.firstName} ${residentDetails?.middleName[0]}.`}{' '}
            from the records?
          </Typography>
          <Button onClick={handleDeleteResident}>Remove</Button>
        </Box>
      </Modal>
    </div>
  );
}
