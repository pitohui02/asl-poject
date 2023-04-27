import React from "react"
import { Typography, Box, Paper, TextField, Button } from "@mui/material"

import DrawerComponent from '../../components/drawer'
import TableComponent from "../../components/table"

import styles from '../styles/dashboard.module.css'

export default class Dashboard extends React.Component {

    render() {

        return (

            <>
                <Box className = {styles.dashboardDesign}>

                    <TableComponent />

                    <DrawerComponent />

                </Box>

            </>
        )
    }

}