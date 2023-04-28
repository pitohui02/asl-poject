import React from "react"
import { Typography, Box, Paper, TextField, Button, FormControl } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';

import DrawerComponent from '../../components/drawer'
import TableComponent from "../../components/table"

import styles from '../styles/dashboard.module.css'

export default class Dashboard extends React.Component {

    render() {

        return (

            <>
                <Box className = {styles.dashboardDesign}>


                        <SearchIcon />
                        <TextField size = "small" variant="outlined"/>

                    <TableComponent />

                    <DrawerComponent />

                </Box>

            </>
        )
    }

}