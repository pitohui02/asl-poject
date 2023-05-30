import React from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import Image from 'next/image';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import styles from '../styles/login.module.css';

import axios from 'axios';

import { withRouter } from 'next/router';

class LoginPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',

      // userCreds: new Map([['TestUser', 'MyVeryOwnTestPassword123$']]),
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;

    axios
      .post(`${process.env.SERVER_URL}/account/login`, { username, password })
      .then(res => {
        localStorage.setItem('jwt', `Bearer ${res.data}`);
        axios.interceptors.request.use(
          config => {
            const allowedOrigins = [process.env.SERVER_URL];

            if (allowedOrigins.includes(origin)) {
              config.headers['Authorization'] = `Bearer ${res.data}`;
            }
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        );
        this.props.router.push('/landing');
      })
      .catch(e => console.log(e));
  };

  handleUsernameData = (event: any) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordData = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleBack = () => {
    this.props.router.push('/');
  };

  render() {
    return (
      <>
        <Box className={styles.centerscreen}>
          <Paper className={styles.paperdesign} elevation={12}>
            <Box className={styles.mainbox}>
              <Box className={styles.gridchild1}>
                <Box className={styles.iconbox}>
                  <IconButton
                    className={styles.removeraduis}
                    onClick={this.handleBack}
                  >
                    <ArrowBackIcon className={styles.backIcon} />
                  </IconButton>
                </Box>

                <Box className={styles.leftsidecontent}>
                  <Image
                    src="/logo-barangay.png"
                    alt="placeholder"
                    width={250}
                    height={250}
                    className={styles.imageDesign}
                  />

                  <Box>
                    <Typography variant="h6" className={styles.titletext}>
                      Barangay 15 Zone 01 District 01
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={styles.subtext}
                      gutterBottom
                    >
                      Certificate Issuance System
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className={styles.gridchild2}>
                <Box>
                  <Typography variant="h6" className={styles.titledesign}>
                    SIGN IN
                  </Typography>

                  <Divider variant="middle" />
                </Box>

                <Box className={styles.fieldDesign}>
                  <PersonIcon fontSize="medium" className={styles.iconstyle} />

                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    onChange={this.handleUsernameData}
                    size="small"
                  />
                </Box>

                <Box>
                  <LockIcon fontSize="medium" className={styles.iconstyle} />

                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={this.handlePasswordData}
                    size="small"
                  />
                </Box>

                <Box>
                  <Button
                    variant="contained"
                    type="submit"
                    className={styles.buttonstyle}
                    onClick={this.handleLogin}
                  >
                    {' '}
                    LOG IN
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
}

export default withRouter(LoginPage);
