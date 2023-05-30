import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import styles from '../src/styles/printmodal.module.css';
import withAuth from '../src/pages/api/auth/withAuth';

// type PrintRequestForm = {
//   findings: string;
//   purpose: string;
// };

type formProps = {
  closeModal: any;
  data: any;
};

export const ERROR_CODES = {
  ERR_BAD_REQUEST:
    'There was a problem processing your request, please try again.',
};

function PrintRequestForm({ closeModal, data }: formProps): JSX.Element {
  // const [residentId, setResidentId] = useState<number>();
  const [withError, setWithError] = useState<boolean>(false);
  const [waitMessage, setWaitMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [printRequestFormDetails, setPrintRequestFormDetails] = useState({
    residentFullName: {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    },
    findings: '',
    purpose: '',
  });

  function handleIdChange(e: any) {
    setPrintRequestFormDetails((prev: any) => ({
      ...prev,
      residentId: parseInt(e.target.value),
    }));
  }
  function handleFormFieldChange(e: any) {
    setPrintRequestFormDetails((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    console.log(printRequestFormDetails);
    setIsLoading(true);
    setWaitMessage('Generating pdf...');
    axios({
      url: `${process.env.SERVER_URL}/residentCertificate/print`,
      data: printRequestFormDetails,
      headers: {
        Authorization: localStorage.getItem('jwt'),
      },
      method: 'POST',
      responseType: 'arraybuffer', // set the response type to arraybuffer
    })
      .then((response: AxiosResponse) => {
        // convert the response data to a blob

        const blob = new Blob([response.data], { type: 'application/pdf' });

        // create a URL from the blob data
        const fileUrl = window.URL.createObjectURL(blob);

        // create a temporary link element to download the file
        const link = document.createElement('a');

        const residentInitials = `${printRequestFormDetails.residentFullName.firstName[0]}${printRequestFormDetails.residentFullName.middleName[0]}${printRequestFormDetails.residentFullName.lastName[0]}`;

        link.href = fileUrl;
        link.setAttribute('download', `B15-Z1-D01-${residentInitials}.pdf`); // set the desired filename here
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        setWithError(true);
        setErrorMessage(ERROR_CODES['ERR_BAD_REQUEST']);
        console.error(error);
      });
  }

  function handleCancel() {
    closeModal();
  }

  return (
    <>
      <Paper className={styles.paperdesign}>
        <Box className={styles.superbox}>
          <Box className={styles.mainbox}>
            <Box>
              <Typography variant="subtitle1" className={styles.textguides}>
                Printing Residency Certificate for {data.lastName},{' '}
                {data.firstName} {data.middleName}
              </Typography>
              {/* <TextField
                name="residentId"
                value={printRequestFormDetails.residentId}
                onChange={handleIdChange}
                label="Resident ID"
                variant="filled"
                className={styles.idfield}
              /> */}
            </Box>

            <Box className={styles.purposebox}>
              <Box>
                <Typography variant="subtitle1" className={styles.textguides}>
                  FINDINGS
                </Typography>
                <TextField
                  name="findings"
                  value={printRequestFormDetails.findings}
                  onChange={handleFormFieldChange}
                  label="Findings"
                  variant="filled"
                  multiline
                  rows={4}
                  className={styles.purposechild}
                />
              </Box>

              <Box>
                <Typography variant="subtitle1" className={styles.textguides}>
                  PURPOSE
                </Typography>
                <TextField
                  name="purpose"
                  value={printRequestFormDetails.purpose}
                  onChange={handleFormFieldChange}
                  label="Purpose"
                  variant="filled"
                  multiline
                  rows={4}
                  className={styles.purposechild}
                />
              </Box>
            </Box>
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {withError && (
                  <Typography color="error"> {errorMessage} </Typography>
                )}
                {!withError && <Typography> {waitMessage} </Typography>}
              </Box>
            )}
          </Box>

          <Box className={styles.buttonbox}>
            <Box>
              <Button onClick={handleCancel} variant="outlined" color="error">
                {' '}
                Cancel{' '}
              </Button>
            </Box>

            <Box>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained"
                className={styles.certbtn}
              >
                {' '}
                Get Certificate{' '}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default withAuth(PrintRequestForm);
