import { useEffect, useState } from 'react';
import axios from 'axios';
// import Presenter from './table';
import Presenter from '../presentors/ResidentTable';

import { styled } from '@mui/system';

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

  const Mainbox = styled(Box)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;

  justify-content: center;
  `;

  const Searchbox = styled(Box)`
  display: flex;
  column-gap: 20px;
  justify-content: center;

  padding-bottom: 20px;
  `;

  const Selectorbox = styled(Box) `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  `;

  const Selector = styled(Select) `
  width: 200px;
  text-align: center;
  `;

  const Optionid = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 20px;
  `;

  const OptionName = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 20px;
  align-items: center;
  `;

  const FNBtn = styled(Box)`
  display: flex;
  flex-flow: row nowrap;
  column-gap: 20px;
  align-items: center;
  `;

  const AllresBtn = styled(Button)`
  width: 12vw;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  background-color: #393E46;
  color: #e9ecef;
  font-weight: 'bold';

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;

  &:hover {
    background-color: #372e2fff;
  }
  `;

  const SearchBtn = styled(Button)`
  width: 12vw;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  background-color: #393E46;
  color: #e9ecef;
  font-weight: 'bold';

  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;

  &:hover {
    background-color: #372e2fff;
  }

  `;


  return (
    <>
      <Mainbox>
        <Searchbox>
          <Selectorbox>
            <Selector
              name="searchbox"
              required
              onChange={handleSearchOptionChange}
              value={searchOption}
              size="small"
              variant="outlined"
              
            >
              <MenuItem value="id">Search by ID</MenuItem>
              <MenuItem value="name">Search by Full Name</MenuItem>
            </Selector>
          </Selectorbox>

          <Box>
            {searchOption === 'id' && (
              <Optionid>
                <TextField
                  label="Search by Resident ID"
                  size="small"
                  variant="filled"
                  onChange={handleSearchResident}
                  sx = {{width: '70vh'}}
                />
              </Optionid>
            )}
          </Box>

          {searchOption === 'name' && (
            <OptionName>
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
            </OptionName>
          )}
          <FNBtn>
            <SearchBtn
              variant="contained"
              onClick={handleSearchClick}
            >
              SEARCH
            </SearchBtn>

            <AllresBtn
              variant="contained"
              size="small"
              onClick={handleAllResidents}
            >
              All Records
            </AllresBtn>
          </FNBtn>
        </Searchbox>
      </Mainbox>

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
