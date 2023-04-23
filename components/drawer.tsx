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



            <Box>
                    
                <Drawer anchor = "left" variant = "permanent" >

                    <Paper className = {styles.drawerdesign}>

                        <Box  className = {styles.drawerbox}>

                        <Typography variant = "h4">BARANGAY 15</Typography>
                        

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
                        className = {styles.logoutButton}
                        onClick={this.handleLogOut}> LOG OUT
                        </Button>

                        </Box>



                        </Box>

                    </Paper>

                </Drawer>
                
            </Box>





        )
    }
}

export default withRouter(DrawerComponent)