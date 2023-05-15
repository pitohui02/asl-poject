import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../components/drawer';
import ResidentContainer from '../../components/containers/ResidentContainer';
import AppbarDashboard from '../../components/AppbarDashboard';

import styles from '../styles/dashboard.module.css';
import withAuth from '../pages/api/auth/withAuth';

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log('=====>', error, errorInfo);
  }
  render() {
    return (
      <>
        <Box className={styles.dashboard}>
          <Box>
            <AppbarDashboard />
          </Box>

          <Box>
            <ResidentContainer />
          </Box>
        </Box>
      </>
    );
  }
}

export default withAuth(Dashboard); 
