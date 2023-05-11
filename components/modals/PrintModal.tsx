import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/drawer.module.css';
import Registration from '@/pages/registration';
import PrintRequestForm from '../PrintRequestForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Button className={styles.contentbtn} onClick={handleOpen} variant="contained">
        PRINT CERTIFICATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PrintRequestForm closeModal={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}
