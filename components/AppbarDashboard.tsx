import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import DrawerComponent from './drawer';

import styles from '../src/styles/homepage.module.css';

import { styled } from '@mui/system'

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
    this.props.router.push('/landing');
  };

  render() {
    const StyledAppbar = styled(AppBar) `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: #2C74B3;
    `;
    

    const Rightside = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;

    column-gap: 10px;
    margin-right: 10px;
    `;

    const ButtonStyle = styled(Button) `
    width: 20vh;
    height: 5vh;
  
    color: #e9ecef;
    font-weight: 'bold';
  
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.25em;
    border-radius: 10px;
    background-color: #235D90;

    &:hover {
      background-color: #393E46;
    }
    `;
    return (
      <>
        <StyledAppbar position="static" >
          <Box>
            <DrawerComponent />
          </Box>

          <Rightside>
            <Box>
              <ButtonStyle  
                variant="text"
                type="submit"
                onClick={this.handleLogout}
              >
                {' '}
                LOG OUT
              </ButtonStyle>
            </Box>

            <Box>
              <ButtonStyle
                variant="text"
                type="submit"
                onClick={this.handleDashboard}
              >
                {' '}
                HOME
              </ButtonStyle>
            </Box>
          </Rightside>
        </StyledAppbar>
      </>
    );
  }
}

export default withRouter(AppbarLanding);
