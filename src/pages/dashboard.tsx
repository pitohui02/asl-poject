import React from 'react';
import { Box } from '@mui/material';

import DrawerComponent from '../../components/drawer';
import ResidentContainer from '../../components/ResidentContainer';



export default class Dashboard extends React.Component<any, any> {
  render() {
    return (
      <>

        <Box>
          <Box>
            <DrawerComponent />
          </Box>

          <Box>
            <ResidentContainer />
          </Box>
        </Box>
      </>
    );
  }
}
