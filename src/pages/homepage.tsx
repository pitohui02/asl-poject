import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";

import Appbar from "../../components/AppbarHome";
import Content from '../../components/HomepageContent'

import { withRouter } from "next/router";

class Homepage extends React.Component <any, any> {
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
            
            <Appbar />
            <Content />
            </>
        )
    }


}

export default withRouter(Homepage)