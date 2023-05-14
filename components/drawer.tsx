import React from 'react';
import { Drawer, Box, Typography, Divider, Button, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import styles from '../src/styles/drawer.module.css'
import Image from 'next/image';

import { withRouter } from 'next/router';
// import EditModal from './modals/EditModal';
import CreateModal from './modals/CreateModal';
import PrintModal from './modals/PrintModal';

class DrawerComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      open: false,
      openRegisterModal: false
    }
  }

  drawerOpen = () => {
    this.setState({open: true})
  }

  drawerClose = () => {
    this.setState({open: false})
  }

  openRegister = () => {
    this.setState({openRegisterModal: true})
  }

  closeRegister = () => {
    this.setState({openRegisterModal: false})
  }

  handleLogout = () => {
    localStorage.removeItem('jwt');
    this.props.router.push('/login')
  }

  handleBack = () => {
    this.props.router.push('/landing')
  }

  render() {
    return (
      <>
          <IconButton onClick={this.drawerOpen} className= {styles.menuicon}> <MenuIcon className= {styles.iconsize}/> </IconButton>
          <Drawer  anchor="left" PaperProps = {{sx: {backgroundColor: '#2C74B3'}}}
          open = {this.state.open}
          onClose={this.drawerClose}>
              <Box className = {styles.iconbuttonbox}>
                  <IconButton className = {styles.iconbutton} onClick={this.drawerClose}>
                      <KeyboardDoubleArrowLeftIcon/>
                  </IconButton>
                </Box>
              <Box className = {styles.drawerdesign}>
                <Box className = {styles.flexchild1}>
                  <Box>
                    <Typography variant="h5" className={styles.drawerTitle}>
                    DASHBOARD
                    </Typography>
                  </Box>

                  <Box>
                    <Image 
                    src = "/logo-barangay.png"
                    alt = "placeholder"
                    width = {150}
                    height = {150}
                    />
                  </Box>

                  <Divider className ={styles.dividerstyle} flexItem/>

                  <Box className = {styles.flexchild1_btn}>
                    <CreateModal />

                    <PrintModal />
                  </Box>  

                </Box>
                
              </Box>
          </Drawer>
      </>
    );
  }
}

export default withRouter(DrawerComponent);