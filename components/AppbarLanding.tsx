import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../src/styles/homepage.module.css';

import { withRouter } from 'next/router';

interface fields {
  HomeButton: boolean;
  DashboardButton: boolean;
}

class AppbarLanding extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleLogout = () => {
    localStorage.removeItem('jwt');
    this.props.router.push('/');
  };

  handleDashboard = () => {
    this.props.router.push('/residents/current');
  };

  render() {
    return (
      <>
        <AppBar position="static" className={styles.appbar}>
          <Box className={styles.leftside}>
            <Box>
              <Image
                src="/logo-barangay.png"
                alt="placeholder"
                width={90}
                height={90}
              />
            </Box>

            <Box className={styles.titlebox}>
              <Typography variant="h4" className={styles.appbartitle}>
                BARANGAY 15 ZONE 01 DISTRICT 01{' '}
              </Typography>
              <Typography variant="subtitle1" className={styles.appbarsubtitle}>
                Certificate Issuance System
              </Typography>
            </Box>
          </Box>

          <Box className={styles.rightside}>
            <Box>
              <Button
                className={styles.btnstyle}
                variant="text"
                type="submit"
                onClick={this.handleLogout}
              >
                {' '}
                LOG OUT
              </Button>
            </Box>

            <Box>
              <Button
                className={styles.btnstyle}
                variant="text"
                type="submit"
                onClick={this.handleDashboard}
              >
                {' '}
                DASHBOARD
              </Button>
            </Box>
          </Box>
        </AppBar>
      </>
    );
  }
}

export default withRouter(AppbarLanding);
