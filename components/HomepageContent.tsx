import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

import { styled } from '@mui/system';

import { withRouter } from 'next/router';
import logo from '../public/logo.png'


class Content extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleLogin = () => {
    this.props.router.push('/login');
  };

  render() {

    const Centerscreen = styled(Box) `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    `;

    const Flexchildone = styled(Box)`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    `;

    const ContentBox = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    column-gap: 20vh;
    `;

    const ContentTitle = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    `;

    const HomepageTitle = styled(Typography) `
    font-size: 50px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    `;

    const Homepagesub = styled(Typography)`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    `;

    return (
      <>
        <Centerscreen>
          <ContentBox>
            <Flexchildone>
              <ContentTitle>
                <HomepageTitle variant="h5">
                  BARANGAY 15
                </HomepageTitle>
                <HomepageTitle variant="h5">
                  ZONE 01 DISTRICT 01
                </HomepageTitle>
                <Homepagesub variant="h6">
                  Certificate Issuance System
                </Homepagesub>
              </ContentTitle>
            </Flexchildone>

            <Box>
              <Image
                src={logo}
                alt="placeholder"
                width={500}
                height={500}
              />
            </Box>
          </ContentBox>
        </Centerscreen>
      </>
    );
  }
}

export default withRouter(Content);
