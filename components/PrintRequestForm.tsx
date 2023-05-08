import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

import styles from '../src/styles/printmodal.module.css';

// type PrintRequestForm = {
//   findings: string;
//   purpose: string;
// };

export default function PrintRequestForm(): JSX.Element {
  const [residentId, setResidentId] = useState<number>();
  const [printRequestFormDetails, setPrintRequestFormDetails] = useState({
    findings: '',
    purpose: '',
  });

  function handleIdChange(e: any) {
    setResidentId(parseInt(e.target.value));
  }
  function handleFormFieldChange(e: any) {
    setPrintRequestFormDetails((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    axios({
      url: `${process.env.apiUrl}/cor/${residentId}`,
      data: printRequestFormDetails,
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
        link.href = fileUrl;
        link.setAttribute('download', `B15-Z1-D01-${residentId}.pdf`); // set the desired filename here
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <>
      <Paper className={styles.paperdesign}>
        <Box className={styles.superbox}>
          <Box className={styles.mainbox}>
            <Box>
              <Typography variant="subtitle1" className={styles.textguides}>
                RESIDENT ID
              </Typography>
              <TextField
                name="residentId"
                value={residentId}
                onChange={handleIdChange}
                label="Resident ID"
                variant="filled"
                className={styles.idfield}
              />
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
          </Box>

          <Box className={styles.buttonbox}>
            <Box>
              <Button onClick={handleSubmit} variant="outlined" color="error">
                {' '}
                Cancel{' '}
              </Button>
            </Box>

            <Box>
              <Button
                onClick={handleSubmit}
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
