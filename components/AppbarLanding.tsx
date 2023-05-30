import React from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../src/styles/homepage.module.css';

import { withRouter } from 'next/router';

import { styled } from '@mui/system'
import css from 'styled-jsx/css';

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

    const StyledAppbar = styled(AppBar) `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: #2C74B3;
    `;
    
    const Leftside = styled(Box)`
    display: flex;
    flex-direction: row;

    column-gap: 20px;
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

    const Titlebox = styled(Box)`
    display: flex;
    flex-direction: column;

    justify-content: center;

    `;

    const Appbartitle = styled(Typography) `
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;

    font-size: 2rem;
    
    `;

    const Appbarsub = styled(Typography) `
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;

    font-size: 20px;
    
    `;

    return (
      <>
        <StyledAppbar position="static">
          <Leftside>
            <Box>
              <Image
                src="/logo.png"
                alt="placeholder"
                width={90}
                height={90}
              />
            </Box>

            <Titlebox>
              <Appbartitle variant="h4">
                BARANGAY 15 ZONE 01 DISTRICT 01{' '}
              </Appbartitle>
              <Appbarsub variant="subtitle1">
                Certificate Issuance System
              </Appbarsub>
            </Titlebox>
          </Leftside>

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
                DASHBOARD
              </ButtonStyle>
            </Box>
          </Rightside>
        </StyledAppbar>
      </>
    );
  }
}

export default withRouter(AppbarLanding);
