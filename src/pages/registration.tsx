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

import styles from '../styles/registration.module.css';
import { Resident } from '../../components/ResidentContainer';
import axios from 'axios';
import { Avatar, IconButton } from '@mui/material';
import dayjs from 'dayjs';

type FormProps = {
  data?: Resident;
  operation: string;
  residentId?: number;
  closeModal: any;
};

export default function Registration({
  data,
  operation,
  residentId,
  closeModal,
}: FormProps) {
  const [residentFields, setResidentFields] = useState<Resident>(
    data ?? {
      id: 0,
      profilePhotoUrl: '',
      firstName: '',
      middleName: '',
      lastName: '',
      maritalStatus: '',
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
    setResidentFields((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handlePhotoChange(e: any) {
    e.preventDefault();

    if (e.target.files[0]) {
      console.log(e.target.files);
      setResidentFields((prev: any) => ({
        ...prev,
        profilePhoto: e.target.files[0],
      }));
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
    let formData = new FormData();

    for (let key in residentFields) {
      if (residentFields.hasOwnProperty(key)) {
        formData.append(key, residentFields[key]);
      }
    }

    if (operation === 'create') {
      return axios
        .post(`${process.env.apiUrl}/resident`, formData, {
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

    if (operation === 'update') {
      return axios
        .put(`${process.env.apiUrl}/resident/${residentId}`, formData, {
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
                  Gender *
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
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Civil Status *
                </Typography>

                <FormControl variant="filled">
                  <Select
                    name="maritalStatus"
                    required
                    className={styles.dropdownDesign}
                    onChange={handleFieldChange}
                    value={residentFields.maritalStatus}
                    size="small"
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                    <MenuItem value="Annulled">Annulled</MenuItem>
                  </Select>
                </FormControl>
              </Box>

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
                  <Typography variant="h6" className={styles.gridchild_text}>
                    Age *
                  </Typography>
                  <TextField
                    type="number"
                    name="age"
                    value={residentFields.age}
                    onChange={handleFieldChange}
                  />
                </FormControl>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Box>
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

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Telephone Number
                </Typography>
                <TextField
                  name="telephoneNumber"
                  variant="filled"
                  value={residentFields.telephoneNumber}
                  onChange={handleFieldChange}
                  size="small"
                  className={styles.gridChild3_Numberfields}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Upload Photo
                </Typography>

                <Box className={styles.uploadbox}>
                  <Avatar
                    variant="square"
                    src={residentFields.profilePhotoUrl}
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
            <Divider orientation="vertical" flexItem />
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  {`Mother\'s`} Full Name *
                </Typography>
                <TextField
                  name="mother"
                  value={residentFields.mother}
                  onChange={handleFieldChange}
                  variant="filled"
                  size="small"
                  className={styles.gridchild4_textfield}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  {`Father\'s`} Full Name
                </Typography>
                <TextField
                  name="father"
                  value={residentFields.father}
                  onChange={handleFieldChange}
                  variant="filled"
                  size="small"
                  className={styles.gridchild4_textfield}
                />
              </Box>

              <Box>
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
            </Box>
            <Divider orientation="vertical" flexItem></Divider>
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
                  Postal Code *
                </Typography>
                <TextField
                  name="postalCode"
                  required
                  variant="filled"
                  onChange={handleFieldChange}
                  size="small"
                  className={styles.postalfield}
                />
              </Box>
            </Box>
          </Box>

          <Box className={styles.registerbox}>
            <Box>
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
