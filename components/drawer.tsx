import React from "react"
import { Drawer, Box, Typography, Paper, Button } from "@mui/material"

import styles from '../src/styles/drawer.module.css'

export default class DrawerComponent extends React.Component {

    render() {

        return (



            <Box>
                    
                <Drawer anchor = "left" variant = "permanent" >

                    <Paper className = {styles.drawerdesign}>

                        <Box  className = {styles.drawerbox}>

                        <Typography variant = "h4">BARANGGAY 15</Typography>

                        <Button 
                        variant= "contained" 
                        type = "submit"
                        className = {styles.buttonstyle}> LOG OUT
                        </Button>

                        </Box>

                    </Paper>

                </Drawer>
                
            </Box>





        )
    }
}