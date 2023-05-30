import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from 'axios';

import styles from '../../src/styles/drawer.module.css';
import Registration from '@/pages/registration';
import PrintRequestForm from '../PrintRequestForm';
import { Resident } from '../containers/ResidentContainer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

type PrintModalProps = {
  residentId: number;
};

export default function PrintModal({ residentId }: PrintModalProps) {
  const [open, setOpen] = useState(false);
  const [residentDetails, setResidentDetails] = useState<
    Resident | undefined
  >();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_URL}/resident/${residentId}`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setResidentDetails(res.data);
      })
      .catch(e => console.log(e));
  }, [residentId, open]);

  return (
    <div>
      <Button
        className={styles.contentbtn}
        onClick={handleOpen}
        variant="contained"
      >
        PRINT CERTIFICATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PrintRequestForm data={residentDetails} closeModal={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
