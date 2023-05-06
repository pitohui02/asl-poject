import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import styles from '../styles/homepage.module.css'
import CreateModalHome from '../../components/modals/CreateModalHome'

import { withRouter } from "next/router";

class Landing extends React.Component <any, any> {
    constructor(props: any) {
        super(props)
        
    }
    
    handleLogout = () => {
        localStorage.removeItem('jwt');
        this.props.router.push('/login')
    }

    handleDashboard = () => {
        this.props.router.push('./dashboard')
    }

    render() {
        return (

            <AppBar position="static" className = {styles.appbar}>

                
                    <Box className = {styles.leftside}>
                            <Box>
                                <Image 
                                src = "/logo_upscaled.png"
                                alt = "placeholder"
                                width = {90}
                                height = {90}
                                />
                            </Box>

                            <Box className = {styles.titlebox}>
                                <Typography variant = "h4" sx = {{fontWeight: 'bold'}}>BARANGAY 15 ZONE 01 DISTRICT 01</Typography>
                                <Typography variant = "subtitle1" sx = {{fontWeight: 'bold'}}>Certificate Issuance System</Typography>
                            </Box>
                        </Box>

                        <Box className = {styles.rightside}>
                            <Box>
                                <Button
                                className = {styles.btnstyle}
                                variant= "text" 
                                type = "submit"
                                onClick={this.handleLogout}
                                > LOGOUT
                                </Button> 
                            </Box>

                            <Box>
                            <Box>
                                <Button
                                className = {styles.btnstyle}
                                variant= "text" 
                                type = "submit"
                                onClick={this.handleDashboard}
                                > DASHBOARD
                                </Button> 
                            </Box>
                                
                            </Box>

                        </Box>
                
            </AppBar>

        )
    }


}

export default withRouter(Landing)