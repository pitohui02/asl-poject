import React, { Dispatch, SetStateAction, useState } from 'react';

import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Divider,
  Button,
} from '@mui/material';

import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import withAuth from '../pages/api/auth/withAuth';

import styles from '../styles/registration.module.css';
import { Resident } from '../../components/containers/ResidentContainer';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { Blob } from 'node:buffer';

import { styled } from '@mui/system'

type FormProps = {
  data?: Resident;
  operation: string;
  residentId?: number;
  closeModal: any;
};

function Registration({
  data,
  operation = 'create',
  residentId,
  closeModal,
}: FormProps) {
  const [withError, setWithError] = useState<boolean>(false);
  const [waitMessage, setWaitMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [onSuccess, setOnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgData, setImgData] = useState<string | ArrayBuffer | null>('');
  const [residentFields, setResidentFields] = useState<any>(
    data ?? {
      id: 0,
      profilePhotoUrl: '',
      firstName: '',
      middleName: '',
      lastName: '',
      civilStatus: 'Single',
      spouse: '',
      homeAddress: '',
      gender: '',
      postalCode: '',
      guardian: '',
      age: 0,
      mother: '',
      father: '',
      telephoneNumber: '',
      mobileNumber: '',
      birthDate: '',
      createdAt: '',
      updatedAt: '',
      isArchived: false,
    }
  );

  function handleFieldChange(e: any) {
    setOnSuccess(false);
    setIsLoading(false);
    const regex = /^[a-zA-Z0-9 ]*$/; // Regular expression to allow only letters, numbers, and spaces

    if (regex.test(e.target.value)) {
      setResidentFields((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }

    // setResidentFields((prev: any) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    // }));
  }

  function handlePhotoChange(e: any) {
    e.preventDefault();

    if (e.target.files[0]) {
      console.log(e.target.files);
      setResidentFields((prev: any) => ({
        ...prev,
        profilePhoto: e.target.files[0],
      }));
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleBirthDateChange(dateValue: any) {
    const formattedDate = `${dateValue['$d'].getMonth() + 1}/${dateValue[
      '$d'
    ].getDate()}/${dateValue['$d'].getFullYear()}`;

    setResidentFields((prev: any) => ({
      ...prev,
      birthDate: formattedDate,
    }));
  }

  function handleCancel() {
    closeModal();
  }

  function handleSubmit() {
    setIsLoading(true);
    setWaitMessage('Saving record ...');
    let formData = new FormData();

    for (let key in residentFields) {
      if (residentFields.hasOwnProperty(key)) {
        formData.append(key, residentFields[key]);
      }
    }

    if (operation === 'update') {
      return axios
        .put(`${process.env.SERVER_URL}/resident/${residentId}`, formData, {
          headers: {
            Authorization: localStorage.getItem('jwt'),
          },
        })
        .then(res => {
          closeModal();
          console.log(res);
        })
        .catch(e => console.log(e));
    }
    return axios
      .post(`${process.env.SERVER_URL}/resident`, formData, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => {
        // closeModal();
        // console.log(res);
        setIsLoading(false);
        setOnSuccess(true);
      })
      .catch(e => {
        console.log(e);
        setWithError(true);
        setErrorMessage(e.response.data);
      });
  }

  // styles //

  const Centerscreen = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  `
  const Paperdesign = styled(Paper)`
  height: auto;
  width: auto;
  padding: 40px;
  `

  const Titledesign = styled(Typography)`
  font-weight: bold;
  margin: 30px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  const Gridparent = styled(Box)`
  height: auto;
  width: auto;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  padding: 30px;

  column-gap: 40px;
  `

  const GridChildText = styled(Typography)`
  display: flex;
  justify-content: flex-start;

  font-weight: bold;
  font-size: 1rem;

  margin-bottom: 5px;
  margin-top: 5px;
  `

  const Dropdowndesign = styled(Select)`
  width: 200px;
  margin-right: 20px;
  
  `

  const Spousebox = styled(TextField)`
  width: 200px;
  margin-right: 20px;
  `
  
  const Addressfield = styled(TextField)`
  margin-right: 50px;
  width: 250px;
  `
  const Uploadbox = styled(Box)`
  display: flex;
  flex-direction: row;
  column-gap: 25px;
  align-items: center;
  `

  const Uploadbutton = styled(Button)`
  width: 160px;
  height: 50px;
  
  background-color: #393E46;

  &:hover {
    background-color: #372e2fff
  }
  `

  return (
    <>
      <Centerscreen>
        <Paperdesign elevation={24}>
          <Box>
            <Titledesign variant="h4">
              RESIDENT FORM{' '}
            </Titledesign>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Gridparent>
            <Box>
              <Box>
                <GridChildText variant="h6">
                  First Name *
                </GridChildText>

                <TextField
                  name="firstName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.firstName}
                  onChange={handleFieldChange}
                  sx = {{width: "250px"}}
                />
              </Box>

              <Box>
                <GridChildText variant="h6" >
                  Middle Name *
                </GridChildText>

                <TextField
                  name="middleName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.middleName}
                  sx = {{width: "250px"}}
                  onChange={handleFieldChange}
                />
              </Box>

              <Box>
                <GridChildText variant="h6">
                  Last Name *
                </GridChildText>

                <TextField
                  name="lastName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.lastName}
                  sx = {{width: "250px"}}
                  onChange={handleFieldChange}
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box>
              <Box>
                <GridChildText variant="h6">
                  Birth Date *
                </GridChildText>

                <FormControl variant="filled">
                  {operation === 'create' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={handleBirthDateChange}
                        value={residentFields.birthDate}
                        sx = {{width: "200px"}}
                      />
                    </LocalizationProvider>
                  )}
                  {operation === 'update' && (
                    <TextField
                      disabled
                      value={residentFields.birthDate}
                      variant="filled"
                      size="small"
                      // className={styles.birthdatebox}
                    />
                  )}
                  <Box>
                    <GridChildText variant="h6">
                      Sex *
                    </GridChildText>
                    <FormControl variant="filled">
                      <Dropdowndesign
                        name="gender"
                        required
                        onChange={handleFieldChange}
                        value={residentFields.gender}
                        size="small"
                        variant="filled"
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Dropdowndesign>
                    </FormControl>
                  </Box>

                  <Box>
                    <GridChildText variant="h6" >
                      Civil Status *
                    </GridChildText>

                    <FormControl variant="filled">
                      <Dropdowndesign
                        name="civilStatus"
                        required
                        onChange={handleFieldChange}
                        value={residentFields.civilStatus}
                        defaultValue=""
                        size="small"
                        variant="filled"
                      >
                        <MenuItem value="Single">
                          <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Widowed">Widowed</MenuItem>
                      </Dropdowndesign>
                    </FormControl>
                  </Box>
                </FormControl>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box>
              {residentFields.civilStatus !== 'Single' && (
                <Box>
                  <GridChildText variant="h6">
                    Spouse *
                  </GridChildText>
                  <Spousebox
                    name="spouse"
                    variant="filled"
                    value={residentFields.spouse}
                    onChange={handleFieldChange}
                    size="small"
                  />
                </Box>
              )}
              <Box sx={{ marginRight: '1em' }}>
                <GridChildText variant="h6">
                  {`Guardian\'s`} Full Name
                </GridChildText>
                <TextField
                  name="guardian"
                  value={residentFields.guardian}
                  onChange={handleFieldChange}
                  variant="filled"
                  size="small"
                  sx = {{width: "200px"}}
                />
              </Box>
              <Box className={styles.gridchild3}>
                <GridChildText variant="h6">
                  Mobile Number
                </GridChildText>
                <TextField
                  name="mobileNumber"
                  variant="filled"
                  value={residentFields.mobileNumber}
                  onChange={handleFieldChange}
                  size="small"
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Box>
                <Box>
                  <GridChildText variant="h6">
                    ADDRESS *
                  </GridChildText>
                  <Addressfield
                    name="homeAddress"
                    required
                    variant="filled"
                    onChange={handleFieldChange}
                    value={residentFields.homeAddress}
                    size="small"
                    multiline
                    rows={5}
                  />
                </Box>

                <Box>
                  <GridChildText variant="h6">
                    Upload Photo *
                  </GridChildText>

                  <Uploadbox>
                    <Avatar
                      variant="square"
                      src={
                        operation === 'create'
                          ? imgData
                          : residentFields.profilePhotoUrl
                      }
                      sx={{ width: '70px', height: '70px' }}
                    />

                    <Uploadbutton
                      variant="contained"
                      component="label"
                      sx = {{width: "160px", height: "50px"}}
                      startIcon={<CameraAltIcon />}
                    >
                      Upload
                      <input
                        hidden
                        onChange={handlePhotoChange}
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Uploadbutton>
                  </Uploadbox>
                </Box>
              </Box>
            </Box>
          </Gridparent>

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

          {onSuccess && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography> Record saved successfully </Typography>
            </Box>
          )}

          <Box className={styles.registerbox}>
            <Box sx={{ marginRight: '2em' }}>
              <Button
                variant="outlined"
                type="submit"
                onClick={handleCancel}
                className={styles.cancelbtn}
                color="error"
              >
                CANCEL
              </Button>
            </Box>

            <Box>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className={styles.registerbtn}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </Paperdesign>
      </Centerscreen>
    </>
  );
}

export default Registration;
