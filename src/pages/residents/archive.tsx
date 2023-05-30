import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../../components/drawer';
import ResidentContainer from '../../../components/containers/ResidentContainer';
import AppbarDashboard from '../../../components/AppbarDashboard';

import styles from '@/styles/dashboard.module.css';
import withAuth from '../api/auth/withAuth';
import { NextRouter } from 'next/router';

interface WithRouterProps {
  router: NextRouter;
}

interface DashboardProps extends WithRouterProps {}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    return (
      <>
        <Box className={styles.dashboard}>
          <Box>
            <AppbarDashboard />
          </Box>

          <Box>
            <ResidentContainer renderArchive={true} />
          </Box>
        </Box>
      </>
    );
  }
}

export default withAuth(Dashboard);
