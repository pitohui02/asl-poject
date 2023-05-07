import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import styles from '../src/styles/landingcontent.module.css'



class LandingContent extends React.Component<any, any>{
 
    render() {
        return (

            <> 
                <Box className = {styles.centerscreen}>
                    <Box className = {styles.landingcontent}>
                        <Box>
                            <Image 
                            src = "/logo_upscaled.png"
                            alt = "placeholder"
                            width = {400}
                            height = {400}
                            className = {styles.logostyle}
                            />
                        </Box>

                        <Box>
                            <Typography variant = "h5" className = {styles.textstyle}>NUMBER OF RESIDENTS: {'200'} </Typography>
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }


}

export default LandingContent