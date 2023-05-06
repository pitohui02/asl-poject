import { useEffect, useState } from 'react';
import axios from 'axios';
import Presenter from './table';
import SearchIcon from '@mui/icons-material/Search';
import { MenuItem, Box, Button, Select, TextField } from '@mui/material';
import styles from '../src/styles/table.module.css';

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

  function handleSearchOptionChange(e) {
    setSearchOption(e.target.value);
  }

  function handleFullNameSearch(e) {
    setFullNameSearch(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContext: '100%',
          width: '100%',
        }}
      >
        <Box className={styles.searchbox}>
          <Select
            name="gender"
            required
            className={styles.dropdownDesign}
            onChange={handleSearchOptionChange}
            value={searchOption}
            size="small"
            variant="filled"
          >
            <MenuItem value="id">Search by Id</MenuItem>
            <MenuItem value="name">Search by Full Name</MenuItem>
          </Select>
          {searchOption === 'id' && (
            <TextField
              label="Search"
              size="small"
              variant="outlined"
              onChange={handleSearchResident}
              className={styles.searchbar}
            />
          )}

          {searchOption === 'name' && (
            <Box sx={{ width: '50%' }}>
              <TextField
                label="First Name"
                size="small"
                variant="outlined"
                name="firstName"
                value={fullNameSearch.firstName}
                onChange={handleFullNameSearch}
                className={styles.searchbar}
              />
              <TextField
                label="Middle Name"
                size="small"
                variant="outlined"
                name="middleName"
                value={fullNameSearch.middleName}
                onChange={handleFullNameSearch}
                className={styles.searchbar}
              />
              <TextField
                label="Last Name"
                size="small"
                variant="outlined"
                name="lastName"
                value={fullNameSearch.lastName}
                onChange={handleFullNameSearch}
                className={styles.searchbar}
              />
            </Box>
          )}
        </Box>
        <Button onClick={handleSearchClick}> Search </Button>
        <Button onClick={handleAllResidents}> All Residents </Button>
        <Presenter tableData={residents} />
      </Box>
    </>
  );
}
