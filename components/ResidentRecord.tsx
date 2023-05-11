import React from 'react';
import { Resident } from './ResidentContainer';
import { Typography, Avatar, Box } from '@mui/material';
import styles from '../src/styles/table.module.css';

type RecordProps = {
  recordData: Resident | undefined;
};

function ResidentRecord({ recordData }: RecordProps) {
  return (
    <Box>
      <Avatar
        variant="square"
        src={recordData?.profilePhotoUrl}
        className={styles.avatarDesign}
      />
      <Typography>First Name: {recordData?.firstName}</Typography>
      <Typography>Middle Name: {recordData?.middleName}</Typography>
      <Typography>Last Name: {recordData?.lastName}</Typography>
      <Typography>Civil Status: {recordData?.maritalStatus}</Typography>
      <Typography>Address: {recordData?.homeAddress}</Typography>
      <Typography>Telephone Number: {recordData?.telephoneNumber}</Typography>
      <Typography>Mobile Number: {recordData?.mobileNumber}</Typography>
      <Typography>Birth Date: {recordData?.birthDate}</Typography>
      <Typography>Mother: {recordData?.mother}</Typography>
      <Typography>Father: {recordData?.father}</Typography>
    </Box>
  );
}

export default ResidentRecord;
