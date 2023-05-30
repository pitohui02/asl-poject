import { useEffect, useState } from 'react';
import axios from 'axios';
// import Presenter from './table';
import Presenter from '../presentors/ResidentTable';
import SearchIcon from '@mui/icons-material/Search';
import {
  MenuItem,
  Box,
  Button,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import styles from '@styles/searchbox.module.css';
import withAuth from '@/pages/api/auth/withAuth';
import Registration from '@/pages/registration';

export type Resident = {
  id: number;
  profilePhotoUrl: string;
  firstName: string;
  middleName: string;
  lastName: string;
  civilStatus: string;
  spouse: string;
  homeAddress: string;
  gender: string;
  postalCode: string;
  guardian: string;
  age: number;
  mother: string;
  father: string;
  telephoneNumber: string;
  mobileNumber: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
  profilePhoto?: string;
};

type ContainerQueryProps = {
  renderArchive: boolean;
};

function ResidentContainer({ renderArchive }: ContainerQueryProps) {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [residentId, setResidentId] = useState(0);
  const [certificateSearch, setCertificateSearch] = useState<string>('');
  const [withError, setWithError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchOption, setSearchOption] = useState('id');
  const [fullNameSearch, setFullNameSearch] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
  });

  // feed residents to data prop of table

  useEffect(() => {
    console.log('===> fetching archive records', renderArchive);
    axios
      .get(`${process.env.SERVER_URL}/resident?archive=${renderArchive}`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => setResidents(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleSearchResident(e: any) {
    setResidentId(parseInt(e.target.value));
  }

  function handleAllResidents() {
    axios
      .get(`${process.env.SERVER_URL}/resident?archive=${renderArchive}`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => setResidents(res.data))
      .catch(err => console.log(err));
  }

  async function handleSearchClick() {
    if (searchOption === 'id') {
      return await axios
        .get(
          `${process.env.SERVER_URL}/resident/${residentId}?archive=${renderArchive}`,
          {
            headers: {
              Authorization: localStorage.getItem('jwt'),
            },
          }
        )
        .then((res: any) => {
          setResidents([res.data]);
        })
        .catch(e => {
          setWithError(true);
          setErrorMessage(e.response.data);
          console.log(e);
        });
    }

    return await axios
      .post(
        `${process.env.SERVER_URL}/resident/search/full-name?archive=${renderArchive}`,
        fullNameSearch,
        {
          headers: {
            Authorization: localStorage.getItem('jwt'),
          },
        }
      )
      .then((res: any) => {
        setResidents([res.data]);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function handleSearchOptionChange(e: any) {
    setSearchOption(e.target.value);
  }

  function handleFullNameSearch(e: any) {
    setFullNameSearch(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <Box className={styles.mainbox}>
        <Box className={styles.searchbox}>
          <Box className={styles.selectorbox}>
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
              <MenuItem value="name">Search by Full Name</MenuItem>
            </Select>
          </Box>

          <Box className={styles.optionbox}>
            {searchOption === 'id' && (
              <Box className={styles.optionId}>
                <TextField
                  label="Search by Resident ID"
                  size="small"
                  variant="filled"
                  onChange={handleSearchResident}
                  className={styles.idstyle}
                />
              </Box>
            )}
          </Box>

          {searchOption === 'name' && (
            <Box className={styles.optionName}>
              <TextField
                label="First Name *"
                size="small"
                variant="filled"
                name="firstName"
                value={fullNameSearch.firstName}
                onChange={handleFullNameSearch}
              />
              <TextField
                label="Middle Name *"
                size="small"
                variant="filled"
                name="middleName"
                value={fullNameSearch.middleName}
                onChange={handleFullNameSearch}
              />
              <TextField
                label="Last Name *"
                size="small"
                variant="filled"
                name="lastName"
                value={fullNameSearch.lastName}
                onChange={handleFullNameSearch}
              />
            </Box>
          )}
          <Box className={styles.FNBtn}>
            <Button
              variant="contained"
              onClick={handleSearchClick}
              className={styles.searchbtn}
            >
              SEARCH
            </Button>

            <Button
              variant="contained"
              size="small"
              onClick={handleAllResidents}
              className={styles.allres}
            >
              All Records
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        {withError && <Typography color="error"> {errorMessage} </Typography>}
      </Box>

      <Box>
        <Presenter isArchived={renderArchive} tableData={residents} />
      </Box>
    </>
  );
}

export default withAuth(ResidentContainer);
