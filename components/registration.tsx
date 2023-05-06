import React from "react"

import { Box, Typography, Paper, TextField, Select, InputLabel, MenuItem, FormControl, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material"

import { DateField, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import styles from '../src/styles/registration.module.css'




class RegistrationModal extends React.Component<any, any>{

    constructor(props: any){
        super(props)

        this.state = {
         
            Gender: '',
            MaritalStatus: '',

            open: false

        }
    }


    dialogOpen = () => {

        this.setState({open: true})

    }


    dialogClose = () => {

        this.setState({open: false})

    }

    handleGendeerSelect = (event: any) => {


        this.setState({Gender: event.target.value as String})
    }


    handleMaritalSelect = (event: any) => {


        this.setState({MaritalStatus: event.target.value as String})
    }


    render() {

        return(
            
            <>
            
            <Dialog
            open = {this.state.open}
            onClose = {this.dialogClose}>

                <DialogTitle>
                    <Typography variant = "h4" className = {styles.titleDesign}> REGISTRATION PAGE </Typography>
                </DialogTitle>

                <DialogContent>

                    <Box className = {styles.gridChild1}>

                                <TextField  required variant="outlined" label = "First Name" size = "small" className = {styles.gridChild1_TextField}/>

                                <TextField  required variant="outlined" label = "Middle Name" size = "small" className = {styles.gridChild1_TextField}/>

                                <TextField  required variant="outlined" label = "Last Name" size = "small" className = {styles.gridChild1_TextField}/>

                            </Box>

                            <Box className = {styles.gridChild2}>
                                
                                <Box>

                                    <FormControl>

                                        <InputLabel size = "small">Gender</InputLabel>

                                        <Select required label = "Gender" className = {styles.dropdownDesign} onChange={this.handleGendeerSelect} value ={this.state.Gender} size = "small">

                                            <MenuItem value = ""><em>Select</em></MenuItem>
                                            <MenuItem value = "Male">Male</MenuItem>
                                            <MenuItem value = "Female">Female</MenuItem>
                                            <MenuItem value = "Others">Others</MenuItem>

                                        </Select>

                                </FormControl>


                                </Box>

                                <Box>

                                    <FormControl>

                                        <InputLabel size= "small">Marital Status</InputLabel>

                                        <Select required label = "Marital Status" className = {styles.dropdownDesign} onChange = {this.handleMaritalSelect} value = {this.state.MaritalStatus} size = "small">

                                            <MenuItem value = ""><em>Select</em></MenuItem>
                                            <MenuItem value = "Single">Single</MenuItem>
                                            <MenuItem value = "Married">Married</MenuItem>
                                            <MenuItem value = "Widowed">Widowed</MenuItem>
                                            <MenuItem value = "Annulled">Annulled</MenuItem>

                                        </Select>

                                    </FormControl>

                                </Box>

                                    
                                    
                                <Box>

                                <TextField variant="outlined" label = "Contact Number" size = "small" className = {styles.gridChild3_Numberfields}/>

                                </Box>

                                <Box>

                                <TextField variant="outlined" label = "Telephone Number" size = "small" className = {styles.gridChild3_Numberfields}/>

                                </Box>



                            </Box>

                            <Box className = {styles.gridChild3}>

                                <Box>
                                    
                                    
                                    
                                    <TextField  required variant="outlined" label = "Home Address" size = "small" className = {styles.gridChild3_address}/>

                                </Box>

                                <Box>

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DateField label = "Birth Date"  size = "small" />

                                    </LocalizationProvider>

                                

                                </Box>

                                <Box>

                                    <FormControl>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DateField label = "Birth Date" size="small" />

                                        </LocalizationProvider>

                                    </FormControl>

                                </Box>

                                <Box>

                                    <TextField variant="outlined" label = "Guardian" size = "small"/>

                                </Box>

                            </Box>
                
                </DialogContent>

                <DialogActions>

                    <Button variant= "contained" >Submit</Button>

                    <Button variant= "contained" autoFocus onClick={this.dialogClose}>Close</Button>

                </DialogActions>

            </Dialog>
                
            
            </>
        )
    }
}

export default RegistrationModal