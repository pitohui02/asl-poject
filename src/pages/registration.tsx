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

import CameraAltIcon from '@mui/icons-material/CameraAlt';

import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import styles from '../styles/registration.module.css';
import { Resident } from '../../components/ResidentContainer';
import axios from 'axios';
import { Avatar, IconButton } from '@mui/material';

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
          
          <Paper className={styles.paperdesign} elevation={12}>

             <Box className={styles.gridTitle}>
                <Typography variant="h4" className={styles.titleDesign}>
                  REGISTRATION PORTAL{' '}
                </Typography>
              </Box>   

            <Box className={styles.gridParent}>
              

              <Box>                 

                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>First Name</Typography>

                  <TextField
                  name="firstName"
                  required
                  variant="filled"
                  label="First Name"
                  size="small"
                  onChange={this.handleFieldChange.bind(this)}
                  className={styles.gridChild1_TextField}
                  />
                </Box>
                  
                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>Middle Name</Typography>

                  <TextField
                    name="middleName"
                    required
                    variant="filled"
                    label="Middle Name"
                    size="small"
                    className={styles.gridChild1_TextField}
                    onChange={this.handleFieldChange.bind(this)}
                    />
                </Box>
              
                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>Last Name</Typography>
                  
                  <TextField
                  name="lastName"
                  required
                  variant="filled"
                  label="Last Name"
                  size="small"
                  className={styles.gridChild1_TextField}
                  onChange={this.handleFieldChange.bind(this)}
                  />
                </Box>

              </Box>
              <Divider orientation='vertical' flexItem></Divider>
              <Box>

                <Box>
                <Typography variant="h6" className= {styles.gridchild_text}>Gender</Typography>
                  <FormControl variant="filled">
                    <InputLabel size="small">Gender</InputLabel>

                    <Select
                      name="gender"
                      required

                      className={styles.dropdownDesign}
                      onChange={this.handleFieldChange.bind(this)}
                      value={this.state.Gender}
                      size="small"
                      variant= "filled"
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
                <Typography variant="h6" className= {styles.gridchild_text}>Marital Status</Typography>

                  <FormControl variant = "filled">
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
                  <Typography variant="h6" className= {styles.gridchild_text}>Birth Date</Typography>

                  <FormControl variant="filled">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      onChange={this.handleBirthDateChange.bind(this)}
                      label="Birth Date"
                      size="small"
                      variant="filled"
                      className= {styles.birthdatebox}
                    />
                  </LocalizationProvider>
                  </FormControl>
                </Box>


              </Box>
              <Divider orientation='vertical' flexItem></Divider>
              <Box>             
                <Box>
                    <Typography variant="h6" className= {styles.gridchild_text}>Contact Number</Typography>
                    <TextField
                      name="contactNumber"
                      variant="filled"
                      label="Contact Number"
                      onChange={this.handleFieldChange.bind(this)}
                      size="small"
                      className={styles.gridChild3_Numberfields}
                    />
                </Box>

                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>Telephone Number</Typography>
                  <TextField
                    name="telephoneNumber"
                    variant="filled"
                    label="Telephone Number"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className={styles.gridChild3_Numberfields}
                  />
                </Box>

                <Box >

                <Typography variant="h6" className= {styles.gridchild_text}>Upload Photo</Typography>

                  <Box className = {styles.uploadbox}>
                    
                    <Avatar variant= "square" src = {this.state.profilePhoto} />

                    <Button variant="contained" component="label" className = {styles.uploadbtn} startIcon={<CameraAltIcon />}>
                      Upload
                      <input
                        hidden
                        onChange={this.handlePhotoChange.bind(this)}
                        accept="image/*"
                        multiple
                        type="file"
                      />
                    </Button>

                  </Box>
                
                </Box>

              </Box>
              <Divider orientation='vertical' flexItem></Divider>
              <Box>
                <Box>
                    <Typography variant="h6" className= {styles.gridchild_text}>Mother's Full Name</Typography>
                    <TextField
                      name="mother"
                      onChange={this.handleFieldChange.bind(this)}
                      variant="filled"
                      label="Mother"
                      size="small"
                    />
                </Box>

                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>Father's Full Name</Typography>
                  <TextField
                    name="father"
                    onChange={this.handleFieldChange.bind(this)}
                    variant="filled"
                    label="Father"
                    size="small"
                  />
                </Box>

                <Box>
                <Typography variant="h6" className= {styles.gridchild_text}>Guardian's Full Name</Typography>
                  <TextField
                    name="guardian"
                    onChange={this.handleFieldChange.bind(this)}
                    variant="filled"
                    label="Guardian (optional)"
                    size="small"
                  />
                </Box>

              </Box>
              <Divider orientation='vertical' flexItem></Divider>
              <Box>
                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>ADDRESS</Typography>
                    <TextField
                      name="homeAddress"
                      required
                      variant="filled"
                      label="Home Address"
                      onChange={this.handleFieldChange.bind(this)}
                      size="small"
                      multiline
                      rows = {5}
                      className= {styles.addressfield}
                    />
                </Box>

                <Box>
                  <Typography variant="h6" className= {styles.gridchild_text}>Postal Code</Typography>
                  <TextField
                    name="postalCode"
                    required
                    variant="filled"
                    label="Postal Code"
                    onChange={this.handleFieldChange.bind(this)}
                    size="small"
                    className= {styles.postalfield}
                    
                  />
                </Box>
              </Box>

            </Box>

            <Box className = {styles.registerbox}>

            <Box>
                <Button
                variant="outlined"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
                className={styles.cancelbtn}
                color= "error"
                >
                      {' '}
                      CANCEL
                </Button>
              </Box>

              <Box>
                <Button
                variant="contained"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
                className={styles.registerbtn}
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
