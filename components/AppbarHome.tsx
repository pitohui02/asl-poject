import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../src/styles/homepage.module.css';

import { withRouter } from 'next/router';

class Appbar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleLogin = () => {
    this.props.router.push('/login');
  };

  render() {
    return (
      <>
        <AppBar position="static" className={styles.appbar}>
          <Box className={styles.leftside}>
            <Box sx={{ marginLeft: '2em ' }}>
              <Image
                src="/logo-barangay.png"
                alt="placeholder"
                width={90}
                height={90}
              />
            </Box>

            <Box className={styles.titlebox}>
              <Typography variant="h5" className={styles.appbarsubtitle}>
                Department of the Interior and Local Government
              </Typography>
              <Typography variant="h6" className={styles.appbarsubtitle}>
                Barangay 15 Zone 01 District 01
              </Typography>
            </Box>
          </Box>

          <Box className={styles.rightside}>
            <Box>
              <Button
                className={styles.btnstyle}
                sx={{ marginRight: '2em' }}
                variant="text"
                type="submit"
                onClick={this.handleLogin}
              >
                SIGN IN
              </Button>
            </Box>

            <Box></Box>
          </Box>
        </AppBar>
      </>
    );
  }
}

export default withRouter(Appbar);
