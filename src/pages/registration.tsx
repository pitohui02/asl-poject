import React from 'react';

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

import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import styles from '../styles/registration.module.css';
import { Resident } from '../../components/ResidentContainer';
import axios from 'axios';

class Registration extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      profilePhoto: '',
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
    };
  }

  handleFieldChange(e: any) {
    this.setState((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  handlePhotoChange(e: any) {
    e.preventDefault();

    if (e.target.files[0]) {
      console.log(e.target.files);
      this.setState((prev: any) => ({
        ...prev,
        profilePhoto: e.target.files[0],
      }));
    }
  }

  handleBirthDateChange(dateValue: any) {
    const formattedDate = `${dateValue['$d'].getMonth() + 1}/${dateValue[
      '$d'
    ].getDate()}/${dateValue['$d'].getFullYear()}`;

    this.setState((prev: any) => ({
      ...prev,
      birthDate: formattedDate,
    }));
  }

  handleSubmit() {
    let formData = new FormData();

    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        formData.append(key, this.state[key]);
      }
    }

    // console.log(formData._boundary);

    axios
      .post(`${process.env.apiUrl}/resident`, formData, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <>
        <Box className={styles.centerscreen}>
          <Paper className={styles.paperdesign}>
            <Box className={styles.gridParent}>
              <Box className={styles.gridTitle}>
                <Typography variant="h4" className={styles.titleDesign}>
                  REGISTRATION A RESIDENT{' '}
                </Typography>
              </Box>

              <Box className={styles.gridChild1}>
                <Button variant="contained" component="label">
                  Upload
                  <input
                    hidden
                    onChange={this.handlePhotoChange.bind(this)}
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </Button>

                <TextField
                  name="firstName"
                  required
                  variant="outlined"
                  label="First Name"
                  size="small"
                  onChange={this.handleFieldChange.bind(this)}
                  className={styles.gridChild1_TextField}
                />

                <TextField
                  name="middleName"
                  required
                  variant="outlined"
                  label="Middle Name"
                  size="small"
                  className={styles.gridChild1_TextField}
                  onChange={this.handleFieldChange.bind(this)}
                />

                <TextField
                  name="lastName"
                  required
                  variant="outlined"
                  label="Last Name"
                  size="small"
                  className={styles.gridChild1_TextField}
                  onChange={this.handleFieldChange.bind(this)}
                />
              </Box>

              <Box className={styles.gridChild2}>
                <Box>
                  <FormControl>
                    <InputLabel size="small">Gender</InputLabel>

                    <Select
                      name="gender"
                      required
                      label="Gender"
                      className={styles.dropdownDesign}
                      onChange={this.handleFieldChange.bind(this)}
                      value={this.state.Gender}
                      size="small"
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
                  <FormControl>
                    <InputLabel size="small">Marital Status</InputLabel>

                    <Select
                      name="maritalStatus"
                      required
                      label="Marital Status"
                      className={styles.dropdownDesign}
                      onChange={this.handleFieldChange.bind(this)}
                      value={this.state.MaritalStatus}
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
                  <TextField
                    name="contactNumber"
                    variant="outlined"
                    label="Contact Number"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className={styles.gridChild3_Numberfields}
                  />
                </Box>

                <Box>
                  <TextField
                    name="telephoneNumber"
                    variant="outlined"
                    label="Telephone Number"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className={styles.gridChild3_Numberfields}
                  />
                </Box>
              </Box>

              <Box className={styles.gridChild3}>
                <Box>
                  <TextField
                    name="homeAddress"
                    required
                    variant="outlined"
                    label="Home Address"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className={styles.gridChild3_address}
                  />
                </Box>

                <Box>
                  <TextField
                    name="postalCode"
                    required
                    variant="outlined"
                    label="Postal Code"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className={styles.gridChild3_address}
                  />
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={this.handleBirthDateChange.bind(this)}
                      label="Birth Date"
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <TextField
                    name="guardian"
                    onChange={this.handleFieldChange.bind(this)}
                    variant="outlined"
                    label="Guardian"
                    size="small"
                  />
                </Box>

                <Box>
                  <TextField
                    name="mother"
                    onChange={this.handleFieldChange.bind(this)}
                    variant="outlined"
                    label="Mother"
                    size="small"
                  />
                </Box>

                <Box>
                  <TextField
                    name="father"
                    onChange={this.handleFieldChange.bind(this)}
                    variant="outlined"
                    label="Father"
                    size="small"
                  />
                </Box>
              </Box>

              <Box className={styles.gridChild4}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={this.handleSubmit.bind(this)}
                  className={styles.gridChil4_buttonStyle}
                >
                  {' '}
                  REGISTER
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
}

export default Registration;
