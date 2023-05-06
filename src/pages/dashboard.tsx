import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../components/drawer';
import TableComponent from '../../components/table';
import ResidentContainer from '../../components/ResidentContainer';

import styles from '../styles/dashboard.module.css';


export default class Dashboard extends React.Component {
  render() {
    return (
      <>

        <Box>
            <DrawerComponent />
        </Box>

        <Box>
          <ResidentContainer />
        </Box>
      </>
    );
  }
}
