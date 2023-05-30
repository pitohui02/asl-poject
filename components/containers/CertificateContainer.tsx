import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
// import Presenter from './table';
import Presentor from '../presentors/IssuedCertificatesTable';
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  MenuItem,
  Box,
  Button,
  Select,
  TextField,
} from '@mui/material';
import styles from '@styles/searchbox.module.css';
import withAuth from '@/pages/api/auth/withAuth';

export type ResidencyCertificate = {
  id: number;
  certificateNumber: string;
};

function CertificateContainer() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certificateSearch, setCertificateSearch] = useState<string>('');
  const [certificateId, setCertificateId] = useState<number>(0);
  const [searchOption, setSearchOption] = useState('number');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [withError, setWithError] = useState<boolean>(false);
  // const [residentId, setResidentId] = useState(0);

  // feed residents to data prop of table

  useEffect(() => {
    axios
      .get(`${process.env.SERVER_URL}/residentCertificate/all`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => setCertificates(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleSearchCertificate(e: any) {
    setCertificateSearch(e.target.value);
  }

  function handleCertificateId(e: any) {
    setCertificateId(parseInt(e.target.value));
  }

  function handleAllCertificates() {
    axios
      .get(`${process.env.SERVER_URL}/residentCertificate/all`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => {
        setWithError(false);
        setCertificates(res.data);
      })
      .catch(err => {
        setErrorMessage(err.response?.data);
        setWithError(true);
        console.log(err);
      });
  }

  function handleSearchOptionChange(e: any) {
    setSearchOption(e.target.value);
  }

  async function handleSearchClick() {
    if (searchOption == 'id') {
      return await axios
        .get(
          `${process.env.SERVER_URL}/residentCertificate/id?val=${certificateId}`,
          {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          }
        )
        .then((res: any) => {
          setCertificates([res.data]);
          setWithError(false);
          console.log(res.data);
        })
        .catch(e => {
          setErrorMessage(e.response?.data);
          setWithError(true);
          console.log(e);
        });
    }

    if (searchOption == 'number') {
      if (certificateSearch === '') {
        setWithError(true);
        setErrorMessage('Please enter a valid certificate number');
        return;
      }
      return await axios
        .get(
          `${process.env.SERVER_URL}/residentCertificate/cert-num?val=${certificateSearch}`,
          {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          }
        )
        .then((res: any) => {
          setCertificates([res.data]);
          setWithError(false);
          console.log(res.data);
        })
        .catch(e => {
          setCertificates([]);
          setWithError(true);
          setErrorMessage(e.response?.data);
          console.log(e);
        });
    }
  }

  return (
    <>
      <Box className={styles.mainbox}>
        <Box className={styles.searchbox}>
          {/* <Box className={styles.selectorbox}>
            <Select
              name="searchbox"
              required
              onChange={handleSearchOptionChange}
              value={searchOption}
              size="small"
              variant="outlined"
              className={styles.selector}
            >
              <MenuItem value="id">Search by ID</MenuItem>
              <MenuItem value="number">Search by Certificate Number</MenuItem>
            </Select>
          </Box> */}
          <Box className={styles.optionbox}>
            {
              <TextField
                label="Search by Certificate Number"
                size="small"
                variant="filled"
                value={certificateSearch}
                onChange={handleSearchCertificate}
                className={styles.idstyle}
              />
            }
            {searchOption == 'id' && (
              <TextField
                label="Search by ID"
                size="small"
                variant="filled"
                value={certificateId}
                onChange={handleCertificateId}
                className={styles.idstyle}
              />
            )}
          </Box>

          <Box className={styles.FNBtn}>
            <Button
              onClick={handleSearchClick}
              variant="contained"
              className={styles.searchbtn}
            >
              SEARCH
            </Button>

            <Button
              variant="contained"
              onClick={handleAllCertificates}
              className={styles.allres}
            >
              All Certificates
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {withError && (
          <Typography color="error">{errorMessage ?? ''}</Typography>
        )}
      </Box>

      <Box>
        <Presentor tableData={certificates} />
      </Box>
    </>
  );
}

export default withAuth(CertificateContainer);
