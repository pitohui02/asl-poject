import { Box, Button, TextField } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

type PrintRequestForm = {
  findings: string;
  purpose: string;
};

function PrintRequestForm() {
  const [residentId, setResidentId] = useState<number>();
  const [printRequestFormDetails, setPrintRequestFormDetails] =
    useState<PrintRequestForm>({
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
      .then(response => {
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
    <Box>
      <TextField
        name="residentId"
        value={residentId}
        onChange={handleIdChange}
        label="Resident Id"
      />
      <TextField
        name="findings"
        value={printRequestFormDetails.findings}
        onChange={handleFormFieldChange}
        label="Findings"
      />
      <TextField
        name="purpose"
        value={printRequestFormDetails.purpose}
        onChange={handleFormFieldChange}
        label="Purpose"
      />
      <a
        href={`${process.env.apiUrl}/cor/${residentId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <a
          href={`${process.env.apiUrl}/cor/1`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button onClick={handleSubmit}>Get Certificate </Button>
        </a>
      </a>
    </Box>
  );
}

export default PrintRequestForm;
