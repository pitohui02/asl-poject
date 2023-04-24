import React from "react"

import { Box, Typography, Paper, TextField, Select, InputLabel, MenuItem } from "@mui/material"
import styles from '../styles/registration.module.css'

class Registration extends React.Component {

    render() {

        return(
            
            <>
            
                <Box className = {styles.centerscreen}>

                <Paper>

                    <Box className = {styles.gridParent}>

                        <Box className = {styles.gridChild1}>

                            <TextField  required variant="outlined" label = "First Name" />

                            <TextField  required variant="outlined" label = "Middle Name" />

                            <TextField  required variant="outlined" label = "Last Name" />

                        </Box>

                        <Box>
                            
                            <InputLabel>Age</InputLabel>

                            <Select label = "Gender" className = {styles.dropdownDesign}>

                                <MenuItem>Male</MenuItem>
                                <MenuItem>Female</MenuItem>
                                <MenuItem>Others</MenuItem>

                            </Select>


                        </Box>

                        <Box>

                        </Box>


                    </Box>

                </Paper>

            </Box>
            
            
            </>
        )
    }
}

export default Registration