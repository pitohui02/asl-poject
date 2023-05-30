import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

import { withRouter } from 'next/router';

import brgylogo from '../public/logo.png'
import { styled } from '@mui/system' 



class Appbar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleLogin = () => {
    this.props.router.push('/login');
  };

  
  render() {

    const Titlebox = styled(Box)`
    display: flex;
    flex-direction: column;

    justify-content: center;
    `;

    const AppBartitle = styled(Typography)`
    font-weight: bold;
    font-size: 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `;

    const AppbarSub = styled(Typography) `
    font-weight: bold;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `;

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


    return (
      <>
        <StyledAppbar position='static'>
          <Leftside>
            <Box sx={{ marginLeft: '2em ' }}>
              <Image
                src={brgylogo}
                alt="placeholder"
                width={90}
                height={90}
              />
            </Box>

            <Titlebox>
              
              <AppBartitle variant = "h3">
                Department of the Interior and Local Government
              </AppBartitle>

              <AppbarSub variant= "h6">
                Barangay 15 Zone 01 District 01
              </AppbarSub>
            </Titlebox>
          </Leftside>

          <Rightside>
            <Box>
                <ButtonStyle
                  sx={{ marginRight: '2em' }}
                  variant="text"
                  type="submit"
                  onClick={this.handleLogin}
                >
                  SIGN IN
                </ButtonStyle>
            </Box>
          </Rightside>
        </StyledAppbar>
      </>
    );
  }
}

export default withRouter(Appbar);
