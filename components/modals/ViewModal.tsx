import { useEffect, useState } from 'react';

import styles from '../../src/styles/modals.module.css'

import { IconButton, Paper, Box, Modal } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Resident } from '../ResidentContainer';
import ResidentRecord from '../ResidentRecord';



type ViewProps = {
  residentDetails: Resident;
};

export default function ViewRecordModal({ residentDetails }: ViewProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <AssignmentIndIcon className={styles.actionbuttons} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

        className = {styles.centerscreen}
      >
        <Box component={Paper}>
          <ResidentRecord recordData={residentDetails} />
        </Box>
      </Modal>
    </Box>
  );
}
