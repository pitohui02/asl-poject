import React from "react"
import { Drawer, Box, Typography, Paper, Button } from "@mui/material"

import styles from '../src/styles/drawer.module.css'

import { withRouter } from "next/router"

class DrawerComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

    }

    handleLogOut = () => {

        this.props.router.push('/login')

    }

    handleRegister = () => {

        this.props.router.push('/registration')

    }

    render() {

        return (

            <Box >
                    
                <Drawer anchor = "left" variant = "permanent">
                        
                    <Box className = {styles.drawerbox}>

                        <Typography variant = "h5" className = {styles.drawerTitle}>BARANGAY 15</Typography>
                            

                        <Box className = {styles.groupButton}>

                            <Button
                            variant= "contained" 
                            type = "submit"
                            className = {styles.registerButton}
                            onClick={this.handleRegister}
                            >
                                REGISTER A RESIDENT

                            </Button>


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

export default withRouter(DrawerComponent)