import React from 'react';
import { Resident } from './containers/ResidentContainer';
import { Typography, Avatar, Box, Divider } from '@mui/material';
import styles from '../src/styles/modals.module.css';

type RecordProps = {
  recordData: Resident | undefined;
};

function ResidentRecord({ recordData }: RecordProps) {
  return (
    <>
      <Box className={styles.recordcontainer}>
        <Box>
          <Avatar
            variant="square"
            src={recordData?.profilePhotoUrl}
            className={styles.avatarstyle}
          />
        </Box>

        <Box className={styles.residentinfobox}>
          <Box className={styles.firstcol}>
            <Box>
              <Typography variant="subtitle1">Full Name </Typography>
              <Typography variant="h6">{`${recordData?.lastName}, ${recordData?.firstName} ${recordData?.middleName}`}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1">Date of Birth</Typography>
              <Typography variant="h6"> {recordData?.birthDate} </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1"> Age</Typography>
              <Typography variant="h6">{recordData?.age}</Typography>
            </Box>
          </Box>

          <Divider flexItem orientation="vertical" />

          <Box className={styles.secondcol}>
            <Box>
              <Typography variant="subtitle1">Civil Status</Typography>
              <Typography variant="h6"> {recordData?.civilStatus}</Typography>
            </Box>

            {recordData?.civilStatus !== 'Single' && (
              <Box>
                <>
                  <Typography variant="subtitle1">Spouse </Typography>
                  <Typography variant="h6">
                    Spouse: {recordData?.spouse}
                  </Typography>
                </>
              </Box>
            )}

            <Box>
              <Typography variant="subtitle1">Mother's Full Name</Typography>
              <Typography variant="h6">{recordData?.mother}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Father's Full Name </Typography>
              <Typography variant="h6">{recordData?.father}</Typography>
            </Box>
          </Box>
          <Divider flexItem orientation="vertical" />

          <Box className={styles.thirdcol}>
            <Box>
              <Typography variant="subtitle1">Address</Typography>
              <Typography variant="h6">{`${recordData?.postalCode} - ${recordData?.homeAddress}`}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1">Telephone Number</Typography>
              <Typography variant="h6">
                {recordData?.telephoneNumber ?? 'N/A'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">Mobile Number</Typography>
              <Typography variant="h6">
                {recordData?.mobileNumber ?? 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ResidentRecord;
