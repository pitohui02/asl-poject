import React from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import Image from 'next/image';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system'



import axios from 'axios';

import { withRouter } from 'next/router';

import brgylogo from '../../public/logo.png'

class LoginPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',

      // userCreds: new Map([['TestUser', 'MyVeryOwnTestPassword123$']]),
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;

    axios
      .post(`${process.env.SERVER_URL}/account/login`, { username, password })
      .then(res => {
        localStorage.setItem('jwt', `Bearer ${res.data}`);
        axios.interceptors.request.use(
          config => {
            const allowedOrigins = [process.env.SERVER_URL];

            if (allowedOrigins.includes(origin)) {
              config.headers['Authorization'] = `Bearer ${res.data}`;
            }
            return config;
          },
          error => {
            return Promise.reject(error);
          }
        );
        this.props.router.push('/landing');
      })
      .catch(e => console.log(e));
  };

  handleUsernameData = (event: any) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordData = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleBack = () => {
    this.props.router.push('/homepage');
  };

  render() {

    const Centerscreen = styled(Box) `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 99vh;
    `
    const Paperdesign = styled(Paper)`
    height: 500px;
    width: 100vh;
    `
    const Mainbox = styled(Box)`
    height: 500px;
    width: auto;

    display: flex;
    flex-flow: row nowrap;
    `

    const Gridchild1 = styled(Box)`
    display: flex;

    flex-grow: 2;
    flex-flow: column nowrap;
    background-color: #2C74B3;;
    `

    const Iconbox = styled(Box)`
    display: flex;
    justify-content: flex-start;
    `

    const Leftsidecontent = styled(Box)`
    display: flex;
    flex-flow: column nowrap;

    align-items: center;

    margin-top: 50px;
    `
    const Titletext = styled(Typography)`
    color: #2C74B3;
    margin-top: 10px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `

    const Subtext = styled(Typography)`
    color: #2C74B3;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `

    const Gridchild2 = styled(Box)`
    flex-grow: 1;
    align-content: center;
    `
    
    const Titledesign = styled(Typography)`
    
    font-weight: bold;

    font-size: 2.5rem;

    margin-top: 20px;
    margin-bottom: 10px;
    
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    `

    const FieldDesign = styled(Box)`
    margin-top: 90px;
    margin-bottom: 25px;
    `

    const PersonStyle = styled(PersonIcon)`
    font-size: 35px;
    margin-right: 10px;
    text-align: center;
    `

    const LockStyle = styled(LockIcon)`
    font-size: 35px;
    margin-right: 10px;
    text-align: center;
    `

    const Buttonstyle = styled(Button)`
    width: 32vh;
    background-color: #495057;
    color: #e9ecef;
    font-weight: 'bold';
    align-items: center;

    margin-top: 30px;

    &:hover {
      background-color: #343a40;
    }
    `

    return (
      <>
        <Centerscreen>
          <Paperdesign elevation={12}>
            <Mainbox>
              <Gridchild1>
                <Iconbox>
                  <IconButton
                    sx = {{borderRadius: "0"}}
                    onClick={this.handleBack}
                  >
                    <ArrowBackIcon sx = {{color: "#e9ecef", padding: "5px"}} />
                  </IconButton>
                </Iconbox>

                <Leftsidecontent>
                  <Image
                    src={brgylogo}
                    alt="placeholder"
                    width={256}
                    height={256}
                  />

                  <Box>
                    <Titletext variant="h6" >
                      Barangay 15 Zone 01 District 01
                    </Titletext>
                    <Subtext
                      variant="subtitle1"
                      gutterBottom
                    >
                      Certificate Issuance System
                    </Subtext>
                  </Box>
                </Leftsidecontent>
              </Gridchild1>

              <Gridchild2>
                <Box>
                  <Titledesign variant="h6" >
                    SIGN IN
                  </Titledesign>

                  <Divider variant="middle" />
                </Box>

                <FieldDesign>
                  <PersonStyle fontSize="medium" />

                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    onChange={this.handleUsernameData}
                    size="small"
                  />
                </FieldDesign>

                <Box>
                  <LockStyle fontSize="medium" />

                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={this.handlePasswordData}
                    size="small"
                  />
                </Box>

                <Box>
                  <Buttonstyle
                    variant="contained"
                    type="submit"
                    
                    onClick={this.handleLogin}
                  >
                    {' '}
                    LOG IN
                  </Buttonstyle>
                </Box>
              </Gridchild2>
            </Mainbox>
          </Paperdesign>
        </Centerscreen>
      </>
    );
  }
}

export default withRouter(LoginPage);
