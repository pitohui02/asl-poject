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
import { ResidencyCertificate } from '../containers/CertificateContainer';

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
  // {
  //   field: 'id',
  //   headerName: 'Certificate ID',
  //   width: 150,
  // },
  {
    field: 'certificateNumber',
    headerName: 'Certificate Number',
    width: 400,
  },
  {
    field: 'findings',
    headerName: 'Findings',
    editable: false,
    width: 400,
  },
  {
    field: 'purpose',
    headerName: 'Purpose',
    editable: false,
    width: 400,
  },
  {
    field: 'issuedAt',
    headerName: 'Issued At',
    editable: false,
    width: 200,
  },
  {
    field: 'expiresAt',
    headerName: 'Expires At',
    editable: false,
    width: 200,
  },
];

type tableProps = {
  tableData: ResidencyCertificate[];
};

function IssuedCertificatesTable({ tableData }: tableProps) {
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

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <>
      <DataGrid
        rows={tableData}
        // rows = {data} // Sample Data
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        // onRowClick={handleRowClick}
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
            <UpdateModal
              closeParentModal={handleClose}
              residentId={residentDetails?.id}
            />
            <DeleteIconModal
              closeParentModal={handleClose}
              residentDetails={residentDetails}
              residentId={residentDetails?.id}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default IssuedCertificatesTable;
