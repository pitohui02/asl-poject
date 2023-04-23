import React from "react"
import { Typography, Box, Paper, TextField, Button } from "@mui/material"
import Image from "next/image"

import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'


import styles from '../styles/login.module.css'
import Dashboard from "./dashboard"

import { NextRouter, withRouter } from "next/router"

interface routerProps {

    router: NextRouter

}


class LoginPage extends React.Component<any, any, routerProps>{

    constructor(props: routerProps) {
        super(props);

        this.state = {

            username: '',
            password: '',

            userCreds: new Map([['admin', '1234']]),

            isLoggedIn: false
        }
    }

    handleLogin = () => {

        const { username, password, userCreds } = this.state

        if(userCreds.get(username) ===  password) {

            this.setState({isLoggedIn: true})
  
        }

        else {
            
            alert('Invalid username or password')
        }

    }

    handleUsernameData = (event: any) => {
        this.setState({username: event.target.value })
    }

    handlePasswordData = (event: any) => {
        this.setState({password: event.target.value })
    }


    render() {

        const { isLoggedIn } = this.state


            if(isLoggedIn){     

                return this.props.router.push('/dashboard') 

            }
        

        return(

            <>
                    <Box className = {styles.centerscreen}>

                        <Paper className = {styles.paperdesign} elevation={5}>
                            
                            <Box className = {styles.mainbox}>

                                <Box className = {styles.gridchild1}>
                                    <Image 
                                    src = "/placeholder.svg"
                                    alt = "placeholder"
                                    width = {500}
                                    height = {500}
                                    />
                                </Box>


                                <Box className = {styles.gridchild2}>
                                    
                                    <Box>

                                        <Typography variant = "h4" className = {styles.titledesign}>BARANGGAY 15</Typography>
                                        <Typography variant = "h6" className = {styles.subdesign}>Certificate Issuance System</Typography>

                                    </Box>

                                    <Box className ={styles.fieldDesign}>
                                        
                                        <PersonIcon fontSize="medium" className = {styles.iconstyle}/> 
                                        
                                        <TextField 
                                            id="username" 
                                            label="Username" 
                                            variant="outlined"
                                            onChange={this.handleUsernameData}
                                        />

                                    </Box>

                                    <Box>

                                        <LockIcon fontSize="medium" className = {styles.iconstyle}/> 

                                        <TextField 
                                            id="password" 
                                            label="Password" 
                                            variant="outlined" 
                                            type="password" 
                                            onChange={this.handlePasswordData}
                                        /> 
                                        
                                    </Box>

                                    <Box>
                                    
                                    <Button 
                                    variant= "contained" 
                                    type = "submit"
                                    className = {styles.buttonstyle}
                                    onClick={this.handleLogin}> LOG IN
                                    </Button>    
                            
                                    </Box>

                                </Box>



                            </Box>

                            
                        </Paper>




                    </Box>
                    
                
                   
            </>

        )
    }
}

export default withRouter(LoginPage)