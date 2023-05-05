import React, { useState } from 'react';

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

type FormProps = {
  data: Resident[];
};

export default function Registration({ data }: FormProps) {
  const [residentFields, setResidentFields] = useState<Resident>({
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
  });

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

  function handleCancel() {}

  function handleSubmit() {
    let formData = new FormData();

    for (let key in residentFields) {
      if (residentFields.hasOwnProperty(key)) {
        formData.append(key, residentFields[key]);
      }
    }

    axios
      .post(`${process.env.apiUrl}/resident`, formData, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  return (
    <>
      <Box className={styles.centerscreen}>
        <Paper className={styles.paperdesign} elevation={12}>
          <Box className={styles.gridTitle}>
            <Typography variant="h4" className={styles.titleDesign}>
              REGISTRATION PORTAL{' '}
            </Typography>
          </Box>

          <Box className={styles.gridParent}>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  First Name
                </Typography>

                <TextField
                  name="firstName"
                  required
                  variant="filled"
                  label="First Name"
                  size="small"
                  value={residentFields.firstName}
                  onChange={handleFieldChange}
                  className={styles.gridChild1_TextField}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Middle Name
                </Typography>

                <TextField
                  name="middleName"
                  required
                  variant="filled"
                  label="Middle Name"
                  size="small"
                  value={residentFields.middleName}
                  className={styles.gridChild1_TextField}
                  onChange={handleFieldChange}
                />
              </Box>

              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Last Name
                </Typography>

                <TextField
                  name="lastName"
                  required
                  variant="filled"
                  label="Last Name"
                  size="small"
                  value={residentFields.lastName}
                  className={styles.gridChild1_TextField}
                  onChange={handleFieldChange}
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem></Divider>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Gender
                </Typography>
                <FormControl variant="filled">
                  <InputLabel size="small">Gender</InputLabel>

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
                  Marital Status
                </Typography>

                <FormControl variant="filled">
                  <InputLabel size="small">Marital Status</InputLabel>

                  <Select
                    name="maritalStatus"
                    required
                    label="Marital Status"
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
                  Birth Date
                </Typography>

                <FormControl variant="filled">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={handleBirthDateChange}
                      label="Birth Date"
                      value={residentFields.birthDate}
                      className={styles.birthdatebox}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem></Divider>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  Contact Number
                </Typography>
                <TextField
                  name="contactNumber"
                  variant="filled"
                  label="Contact Number"
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
                  label="Telephone Number"
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
            <Divider orientation="vertical" flexItem></Divider>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  {`Mother\'s`} Full Name
                </Typography>
                <TextField
                  name="mother"
                  value={residentFields.mother}
                  onChange={handleFieldChange}
                  variant="filled"
                  label="Mother"
                  size="small"
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
                  label="Father"
                  size="small"
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
                  label="Guardian (optional)"
                  size="small"
                />
              </Box>
            </Box>
            <Divider orientation="vertical" flexItem></Divider>
            <Box>
              <Box>
                <Typography variant="h6" className={styles.gridchild_text}>
                  ADDRESS
                </Typography>
                <TextField
                  name="homeAddress"
                  required
                  variant="filled"
                  label="Home Address"
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
                  Postal Code
                </Typography>
                <TextField
                  name="postalCode"
                  required
                  variant="filled"
                  label="Postal Code"
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
                REGISTER
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
