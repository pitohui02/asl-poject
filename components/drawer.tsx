import React from 'react';
import { Drawer, Box, Typography, Paper, Button } from '@mui/material';

import styles from '../src/styles/drawer.module.css';

import { withRouter } from 'next/router';
import EditModal from './modals/EditModal';
import CreateModal from './modals/CreateModal';
import PrintModal from './modals/PrintModal';
import { Component } from 'react';

class DrawerComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleLogOut = () => {
    this.props.router.push('/landing');
  };

  render() {
    return (
        <Drawer anchor="left" variant="permanent" PaperProps = {{sx: {backgroundColor: '#2C74B3'}}}>
          <Box className={styles.drawerbox}>
            <Typography variant="h5" className={styles.drawerTitle}>
              BARANGAY 15
            </Typography>

            <Box className={styles.groupButton}>
              <CreateModal />

              <PrintModal />

              <Button
                variant="contained"
                type="submit"
                className={styles.logoutButton}
                onClick={this.handleLogOut}
              >
                {' '}
                BACK
              </Button>
            </Box>
          </Box>
        </Drawer>
    );
  }
}

export default withRouter(DrawerComponent);