import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from '../../src/styles/drawer.module.css';
import ResidentForm from '@/pages/registration';
import { useRouter } from 'next/router';
import Link from 'next/link';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
};

export default function CreateModal() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [toggleRegister, setToggleRegister] = React.useState(false);
  const handleOpen = async () => {};

  return (
    <div>
      <Link href="/registration" target="_blank">
        <Button
          className={styles.contentbtn}
          // onClick={handleOpen}
          variant="contained"
        >
          REGISTER A RECORD
        </Button>
      </Link>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ResidentForm
            isRegister={toggleRegister}
            closeModal={handleClose}
            operation="create"
          />
        </Box>
      </Modal> */}
    </div>
  );
}
