import {
  DataGrid,
  GridEventListener,
  GridRowParams,
  MuiEvent,
  GridCallbackDetails,
} from '@mui/x-data-grid';

import styles from '@styles/modals.module.css';

import React, { useState } from 'react';
import { Resident } from '../containers/ResidentContainer';
import { Avatar, Box, Modal } from '@mui/material';

import ViewModal from '../modals/ViewModal';
import ResidentRecord from '../ResidentRecord';
import UpdateModal from '../modals/UpdateModal';
import DeleteIconModal from '../modals/DeleteModal';

import data from '../../record-demo/recordData.json';
import PrintModal from '../modals/PrintModal';

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

const columns = [
  {
    field: 'id',
    headerName: 'Resident ID',
    width: 100,
    editable: false,
  },
  {
    field: 'profilePhotoUrl',
    headerName: 'Photo ID',
    width: 100,
    height: 100,
    editable: false,
    renderCell: (params: any) => {
      console.log(params);
      return (
        <>
          <Avatar
            variant="square"
            src={params.value}
            sx={{ height: '50px', width: '50px' }}
          />
        </>
      );
    },
  },

  {
    field: 'firstName',
    headerName: 'First Name',
    editable: false,
    width: 150,
  },
  {
    field: 'middleName',
    headerName: 'Middle Name',
    editable: false,
    width: 150,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    editable: false,
    width: 150,
  },
  {
    field: 'homeAddress',
    headerName: 'Address',
    editable: false,
    width: 400,
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    editable: false,
    width: 170,
  },
  {
    field: 'updatedAt',
    headerName: 'Last Modified',
    editable: false,
    width: 170,
  },
];

type tableProps = {
  tableData: Resident[];
  isArchived: boolean;
};

function ResidentTable({ tableData, isArchived }: tableProps) {
  const [residentDetails, setResidentDetails] = useState<any>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleRowClick: GridEventListener<'rowClick'> = (
    params: GridRowParams,
    event: MuiEvent<React.MouseEvent<HTMLElement>>,
    details: GridCallbackDetails
  ) => {
    setResidentDetails(params.row);
    handleOpen();
  };

  return (
    <>
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        onRowClick={handleRowClick}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.centerscreen}>
          <ResidentRecord recordData={residentDetails} />
          <Box className={styles.buttonGroup}>
            {!isArchived && (
              <>
                <UpdateModal
                  closeParentModal={handleClose}
                  residentId={residentDetails?.id}
                />
                {/* <DeleteIconModal
                  closeParentModal={handleClose}
                  residentDetails={residentDetails}
                  residentId={residentDetails?.id}
                /> */}
                <PrintModal residentId={residentDetails?.id} />
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ResidentTable;
