import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableRow,
  Avatar,
  Box,
  TextField,
  IconButton,
  Button,
  Checkbox,
} from '@mui/material';

import tableData from '../record-demo/recordData.json';
import { Component } from 'react';
import Image from 'next/image';

import styles from '../src/styles/table.module.css';

import SearchIcon from '@mui/icons-material/Search';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Resident } from './ResidentContainer';
import DeleteIconModal from './modals/DeleteModal';
import UpdateModal from './modals/UpdateModal';
import axios from 'axios';
import ViewRecordModal from './modals/ViewModal';

type tableProps = {
  tableData: Resident[];
};

export default function TableComponent({ tableData }: tableProps) {
  return (
    <Box className={styles.mainbox}>
      <TableContainer component={Paper} className={styles.tabledesign}>
        <Table aria-label="sample table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableheadDesign}></TableCell>
              <TableCell className={styles.tableheadDesign}>ID</TableCell>
              <TableCell className={styles.tableheadDesign}>Photo ID</TableCell>
              <TableCell className={styles.tableheadDesign}>
                First Name
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Middle Name
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Last Name
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Marital Status
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Home Address
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Mobile Number
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Telephone Number
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Birth Date
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Created At
              </TableCell>
              <TableCell className={styles.tableheadDesign}>
                Last Updated
              </TableCell>
              <TableCell className={styles.tableheadDesign}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((row: Resident) => (
              <TableRow
                // onClick={() => (
                //   <ViewRecordModal isOpen residentDetails={tableData[row.id]} />
                // )}
                hover
                key={row.id}
              >
                <TableCell>
                  <ViewRecordModal residentDetails={tableData[row.id]} />
                </TableCell>

                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Avatar
                    variant="square"
                    src={row.profilePhotoUrl}
                    className={styles.avatarDesign}
                  />
                </TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.middleName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.maritalStatus}</TableCell>
                <TableCell>{row.homeAddress}</TableCell>
                <TableCell>{row.mobileNumber}</TableCell>
                <TableCell>{row.telephoneNumber}</TableCell>
                <TableCell>{row.birthDate}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.updatedAt}</TableCell>

                <TableCell>
                  <UpdateModal residentId={row.id} />
                  <DeleteIconModal
                    residentDetails={tableData[row.id]}
                    residentId={row.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
