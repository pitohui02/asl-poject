import React from 'react';
import { Drawer, Box, Typography, Paper, Button } from '@mui/material';

import styles from '../src/styles/drawer.module.css';

import { withRouter } from 'next/router';
import EditModal from './modals/EditModal';
import CreateModal from './modals/CreateModal';
import PrintModal from './modals/PrintModal';

import RegistrationModal from '../components/registration'

class DrawerComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
      this.state = {
        open: false
      }
  }

  handleLogOut = () => {
    localStorage.removeItem('jwt');
    this.props.router.push('/login');
  };

    dialogOpen  = () => {

        this.setState({open: true})

    }

    dialogClose = () =>  {

        this.setState({open: true})

    }   


    render() {

        return (

            <Box >
                    
                <Drawer anchor = "left" variant = "permanent">
                        
                    <Box className = {styles.drawerbox}>

                        <Typography variant = "h5" className = {styles.drawerTitle}>BARANGAY 15</Typography>
                            

                        <Box className = {styles.groupButton}>

                            <Box>

                                <Button
                                variant= "contained" 
                                type = "submit"
                                className = {styles.registerButton}
                                onClick={this.dialogOpen}
                                >
                                    REGISTER A RESIDENT

                                </Button>

                                <RegistrationModal 
                                open = {this.state.open}
                                onClose = {this.dialogClose}
                                
                                />

                            </Box>



                            <Button
                            variant= "contained" 
                            type = "submit"
                            className = {styles.printButton}
                            >
                                PRINT CERTIFICATE

                            </Button>

                            <Button 
                            variant= "contained" 
                            type = "submit"
                            className = {styles.logoutButton}
                            onClick={this.handleLogOut}> LOG OUT
                            </Button>

                            
                        </Box>
    
                    </Box>  
                    
                </Drawer>
            </Box>
    )
  }
}

export default withRouter(DrawerComponent);
