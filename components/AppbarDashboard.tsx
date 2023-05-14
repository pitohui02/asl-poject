import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import DrawerComponent from './drawer';

import styles from '../src/styles/homepage.module.css';

import { withRouter } from 'next/router';


interface fields  {
    HomeButton: boolean,
    DashboardButton: boolean


}




class AppbarLanding extends React.Component <any, any> {
    constructor(props: any) {
        super(props)
        
    }
    
    handleLogout = () => {
        localStorage.removeItem('jwt');
        this.props.router.push('/login')
    }


  handleDashboard = () => {
    this.props.router.push('/landing');
  };

  render() {
    return (
      <>
        <AppBar position="static" className={styles.appbar}>

            <Box>
            <DrawerComponent />
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
                HOME
              </Button> 
            </Box>
          </Box>
        </AppBar>
      </>
    );
  }
}

export default withRouter(AppbarLanding);
