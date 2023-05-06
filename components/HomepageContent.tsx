import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import styles from '../src/styles/homepage.module.css'

import CreateModalHome from '../components/modals/CreateModalHome'

import { withRouter } from "next/router";

class Content extends React.Component <any, any> {
    constructor(props: any) {
        super(props)
        
    }
    
    handleLogin = () => {
        this.props.router.push('/login')
    }

    openRegister = () => {
        
    }

    render() {
        return (
            <>
            <Box className = {styles.centerscreen}>
                    <Box className = {styles.contentbox}>
                        
                        <Box className = {styles.flexchild1}>
                            
                            <Box className = {styles.contenttitlebox}>
                                <Typography variant = "h5" className = {styles.homepagetitle}>BARANGAY 15</Typography>
                                <Typography variant = "h5" className = {styles.homepagetitle}>ZONE 01 DISTRICT 01</Typography>
                                <Typography variant = "subtitle1" className = {styles.homepagesubtitle}>Certificate Issuance System</Typography>
                            </Box>

                            <Box>
                                <CreateModalHome />
                            </Box>

                        </Box>

                        

                        <Box>
                            <Image 
                            src = "/logo_upscaled.png"
                            alt = "placeholder"
                            width = {400}
                            height = {400}
                            />
                        </Box>
                    </Box>
                </Box>

            </>
        )
    }


}

export default withRouter(Content)