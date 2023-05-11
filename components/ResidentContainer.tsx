import { useEffect, useState } from 'react';
import axios from 'axios';
import Presenter from './table';
import SearchIcon from '@mui/icons-material/Search';
import { MenuItem, Box, Button, Select, TextField } from '@mui/material';
import styles from '../src/styles/searchbox.module.css';

export type Resident = {
  id: number;
  profilePhotoUrl: string;
  firstName: string;
  middleName: string;
  lastName: string;
  maritalStatus: string;
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
};

export default function ResidentContainer() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [residentId, setResidentId] = useState(0);
  const [searchOption, setSearchOption] = useState('id');
  const [fullNameSearch, setFullNameSearch] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
  });

  // feed residents to data prop of table

  useEffect(() => {
    axios
      .get(`${process.env.apiUrl}/resident`, {
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
      .get(`${process.env.apiUrl}/resident`, {
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
        .get(`${process.env.apiUrl}/resident/${residentId}/`, {
          headers: {
            Authorization: localStorage.getItem('jwt'),
          },
        })
        .then((res: any) => {
          setResidents([res.data]);
        })
        .catch(e => {
          console.log(e);
        });
    }

    return await axios
      .post(`${process.env.apiUrl}/resident/search/full-name`, fullNameSearch, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
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
                  label="Search"
                  size="small"
                  variant="filled"
                  onChange={handleSearchResident}
                  className={styles.idstyle}
                />
              </Box>
            )}

            {searchOption === 'name' && (
              <Box className={styles.optionName}>
                <TextField
                  label="First Name"
                  size="small"
                  variant="filled"
                  name="firstName"
                  value={fullNameSearch.firstName}
                  onChange={handleFullNameSearch}
                />
                <TextField
                  label="Middle Name"
                  size="small"
                  variant="filled"
                  name="middleName"
                  value={fullNameSearch.middleName}
                  onChange={handleFullNameSearch}
                />
                <TextField
                  label="Last Name"
                  size="small"
                  variant="filled"
                  name="lastName"
                  value={fullNameSearch.lastName}
                  onChange={handleFullNameSearch}
                />
              </Box>
            )}
          </Box>

          <Box className={styles.IDBtn}>
            <Button
              variant="contained"
              className={styles.searchbtn}
              onClick={handleSearchClick}
            >
              SEARCH
            </Button>

            <Button
              variant="contained"
              className={styles.allres}
              onClick={handleAllResidents}
            >
              All Residents
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <Presenter tableData={residents} />
      </Box>
    </>
  );
}
