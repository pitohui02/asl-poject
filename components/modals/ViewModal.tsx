import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/drawer.module.css';
import Registration from '@/pages/registration';
import PrintRequestForm from '../PrintRequestForm';
import { IconButton } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import axios from 'axios';
import { Resident } from '../ResidentContainer';
import ResidentRecord from '../ResidentRecord';

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

type ViewProps = {
  residentDetails: Resident;
};

export default function ViewRecordModal({ residentDetails }: ViewProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AssignmentIndIcon className={styles.actionbuttons} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ResidentRecord recordData={residentDetails} />
        </Box>
      </Modal>
    </div>
  );
}
