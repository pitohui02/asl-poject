import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../components/drawer';
import ResidentContainer from '../../components/containers/ResidentContainer';
import AppbarDashboard from '../../components/AppbarDashboard';

import styles from '../styles/dashboard.module.css';
import CertificateContainer from '../../components/containers/CertificateContainer';

export default class Dashboard extends React.Component<any, any> {
  render() {
    return (
      <>
        <Box className={styles.dashboard}>
          <Box>
            <AppbarDashboard />
          </Box>

          <Box>
            <CertificateContainer />
          </Box>
        </Box>
      </>
    );
  }
}
