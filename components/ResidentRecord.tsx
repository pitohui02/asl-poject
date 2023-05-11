import React from 'react';
import { Resident } from './ResidentContainer';
import { Typography, Avatar, Box, Divider } from '@mui/material';
import styles from '../src/styles/modals.module.css'


type RecordProps = {
  recordData: Resident | undefined;
};

function ResidentRecord({ recordData }: RecordProps) {
  return (
    <>
      <Box className = {styles.recordcontainer}>
        <Box>
        <Avatar
          variant="square"
          src={recordData?.profilePhotoUrl}
          className={styles.avatarstyle}
        />
        </Box>

        <Box className = {styles.residentinfobox}>
          <Box className = {styles.firstcol}>
            <Box>
              <Typography variant= "h6">First Name: {recordData?.firstName}</Typography>
              <Typography variant= "h6">Middle Name: {recordData?.middleName}</Typography>
              <Typography variant= "h6">Last Name: {recordData?.lastName}</Typography>
            </Box>

            <Box>
              <Typography variant= "h6">Birth Date: {recordData?.birthDate}</Typography>
              <Typography variant= "h6">Age: {recordData?.age}</Typography>
            </Box>
          </Box>
          
          <Divider flexItem orientation='vertical'/>

          <Box className = {styles.secondcol}>
            <Box>
              <Typography variant= "h6">Civil Status: {recordData?.maritalStatus}</Typography>
              <Typography variant= "h6">Spouse: {recordData?.spouse}</Typography>
            </Box>

            <Box>
              <Typography variant= "h6">Mother: {recordData?.mother}</Typography>
              <Typography variant= "h6">Father: {recordData?.father}</Typography>
            </Box>
          </Box>
          <Divider flexItem orientation='vertical'/>
          
          <Box className = {styles.thirdcol}>
            <Typography variant= "h6">Address: {recordData?.homeAddress}</Typography>
            
            <Box>
              <Typography variant= "h6">Telephone Number: {recordData?.telephoneNumber}</Typography>
              <Typography variant= "h6">Mobile Number: {recordData?.mobileNumber}</Typography>
            </Box>
          </Box>

        </Box>

      </Box>
    </>
  );
}

export default ResidentRecord;
