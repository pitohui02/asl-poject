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

  return (
    <>
      <Box className={styles.centerscreen}>
        <Paper className={styles.paperdesign} elevation={24}>
          <Box className={styles.gridTitle}>
            <Typography variant="h4" className={styles.titleDesign}>
              RESIDENT FORM{' '}
            </Typography>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Box className={styles.gridParent}>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  First Name *
                </Typography>

                <TextField
                  name="firstName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.firstName}
                  onChange={handleFieldChange}
                  className={styles.gridChild1_TextField}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Middle Name *
                </Typography>

                <TextField
                  name="middleName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.middleName}
                  className={styles.gridChild1_TextField}
                  onChange={handleFieldChange}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Last Name *
                </Typography>

                <TextField
                  name="lastName"
                  required
                  variant="filled"
                  size="small"
                  value={residentFields.lastName}
                  className={styles.gridChild1_TextField}
                  onChange={handleFieldChange}
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Birth Date *
                </Typography>

                <FormControl variant="filled">
                  {operation === 'create' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        onChange={handleBirthDateChange}
                        value={residentFields.birthDate}
                        className={styles.birthdatebox}
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
                    <Typography variant="h6" className={styles.gridchild_text}>
                      Sex *
                    </Typography>
                    <FormControl variant="filled">
                      <Select
                        name="gender"
                        required
                        className={styles.dropdownDesign}
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
                      </Select>
                    </FormControl>
                  </Box>

                  <Box>
                    <Typography variant="h6" className={styles.gridchild_text}>
                      Civil Status *
                    </Typography>

                    <FormControl variant="filled">
                      <Select
                        name="civilStatus"
                        required
                        className={styles.dropdownDesign}
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
                      </Select>
                    </FormControl>
                  </Box>
                </FormControl>
              </Box>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box>
              {residentFields.civilStatus !== 'Single' && (
                <Box>
                  <Typography variant="h6" className={styles.gridchild_text}>
                    Spouse *
                  </Typography>
                  <TextField
                    name="spouse"
                    variant="filled"
                    value={residentFields.spouse}
                    onChange={handleFieldChange}
                    size="small"
                    className={styles.spousebox}
                  />
                </Box>
              )}
              <Box sx={{ marginRight: '1em' }}>
                <Typography variant="h6" className={styles.gridchild_text}>
                  {`Guardian\'s`} Full Name
                </Typography>
                <TextField
                  name="guardian"
                  value={residentFields.guardian}
                  onChange={handleFieldChange}
                  variant="filled"
                  size="small"
                  className={styles.gridchild4_textfield}
                />
              </Box>
              <Box className={styles.gridchild3}>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Mobile Number
                </Typography>
                <TextField
                  name="mobileNumber"
                  variant="filled"
                  value={residentFields.mobileNumber}
                  onChange={handleFieldChange}
                  size="small"
                  className={styles.gridChild3_Numberfields}
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Box>
                <Box>
                  <Typography variant="h6" className={styles.gridchild_text}>
                    ADDRESS *
                  </Typography>
                  <TextField
                    name="homeAddress"
                    required
                    variant="filled"
                    onChange={handleFieldChange}
                    value={residentFields.homeAddress}
                    size="small"
                    multiline
                    rows={5}
                    className={styles.addressfield}
                  />
                </Box>

                <Box>
                  <Typography variant="h6" className={styles.gridchild_text}>
                    Upload Photo *
                  </Typography>

                  <Box className={styles.uploadbox}>
                    <Avatar
                      variant="square"
                      src={
                        operation === 'create'
                          ? imgData
                          : residentFields.profilePhotoUrl
                      }
                      sx={{ width: '70px', height: '70px' }}
                    />

                    <Button
                      variant="contained"
                      component="label"
                      className={styles.uploadbtn}
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
                    </Button>
                  </Box>
                </Box>
              </Box>
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
        </Paper>
      </Box>
    </>
  );
}

export default withAuth(Registration);
