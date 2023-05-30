import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../src/styles/landingcontent.module.css'

import { styled } from '@mui/system';
import axios from 'axios';
import brgylogo from '../public/logo.png'

class LandingContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    // Initializing the state
    this.state = { residentCount: 0 };
  }

  componentDidMount(): void {
    axios
      .get(`${process.env.SERVER_URL}/resident`, {
        headers: {
          Authorization: localStorage.getItem('jwt'),
        },
      })
      .then(res => this.setState({ residentCount: res.data.length }))
      .catch(err => console.log(err));
  }

  render() {

    const Centerscreen = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 85vh;
    `;

    const Landingcontent = styled(Box) `
    display: flex;
    flex-direction: column;

    row-gap: 50px;
    align-items: center;
    `;
    

    const Textstyle = styled(Typography) `
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 30px;
    `;

    return (
      <>
        <Centerscreen>
          <Landingcontent>
            <Box>
              <Image
                src={brgylogo}
                alt="placeholder"
                width={400}
                height={400}
                className = {styles.logostyle}
              />
            </Box>

            <Box>
              <Textstyle variant="h5">
                NUMBER OF RESIDENTS: {`${this.state.residentCount}`}
              </Textstyle>
            </Box>
          </Landingcontent>
        </Centerscreen>
      </>
    );
  }
}

export default LandingContent;
