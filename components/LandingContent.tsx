import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';

import styles from '../src/styles/landingcontent.module.css';
import axios from 'axios';
import brgylogo from '../public/LogoBrgy.png'

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
    return (
      <>
        <Box className={styles.centerscreen}>
          <Box className={styles.landingcontent}>
            <Box>
              <Image
                src={brgylogo}
                alt="placeholder"
                width={400}
                height={400}
                className={styles.logostyle}
              />
            </Box>

            <Box>
              <Typography variant="h5" className={styles.textstyle}>
                NUMBER OF RESIDENTS: {`${this.state.residentCount}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
}

export default LandingContent;
