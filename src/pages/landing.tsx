import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import styles from '../styles/homepage.module.css'
import CreateModalHome from '../../components/modals/CreateModalHome'

import AppbarLanding from "../../components/AppbarLanding";

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

            <>
                <AppbarLanding/>
            </>
        )
    }


}

export default withRouter(Landing)