import { createContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/modals.module.css'
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
  closeParentModal: any;
};

export default function UpdateModal({
  residentId,
  closeParentModal,
}: UpdateProps) {
  const [open, setOpen] = useState(false);
  const [residentDetails, setResidentDetails] = useState<Resident | any>({});
  const handleOpen = () => {
    setOpen(true);
    console.log(residentDetails);
  };
  const handleClose = () => {
    setOpen(false);
    closeParentModal();
  };
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
  }, [residentId, open]);

  return (
    <div>
      <Button id={`${residentId}`} onClick={handleOpen} variant = "contained" className= {styles.buttondesign}>
        {/* <ModeEditOutlineIcon className={styles.actionbuttons} /> */}
        UPDATE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ResidentForm
            closeModal={handleClose}
            operation="update"
            residentId={residentId}
            data={residentDetails}
          />
        </Box>
      </Modal>
    </div>
  );
}
