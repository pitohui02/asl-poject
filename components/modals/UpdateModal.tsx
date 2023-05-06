import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/drawer.module.css';
import ResidentForm from '@/pages/registration';
import { IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Resident } from '../ResidentContainer';
import axios from 'axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

type UpdateProps = {
  residentId: number;
};

export default function UpdateModal({ residentId }: UpdateProps) {
  const [open, setOpen] = useState(false);
  const [residentDetails, setResidentDetails] = useState<Resident | any>({});
  const handleOpen = () => {
    setOpen(true);
    console.log(residentDetails);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    axios
      .get(`${process.env.apiUrl}/resident/${residentId}`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setResidentDetails(res.data);
      })
      .catch(e => console.log(e));
  }, [residentId]);

  return (
    <div>
      <IconButton id={`${residentId}`} onClick={handleOpen}>
        <ModeEditOutlineIcon className={styles.actionbuttons} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ResidentForm
            operation="update"
            residentId={residentId}
            data={residentDetails}
          />
        </Box>
      </Modal>
    </div>
  );
}
