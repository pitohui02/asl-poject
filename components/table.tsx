
import { Table, TableHead, TableBody, TableCell, TableContainer, Paper, TableRow, Avatar, Box, FormControl, TextField, Button  } from "@mui/material"


import tableData from '../record-demo/recordData.json'
import { Component } from "react"
import Image from "next/image"

import styles from '../src/styles/table.module.css'

class TableComponent extends Component {
    render() {




        return (

            <Box>

                <TableContainer component = {Paper} className = {styles.tabledesign}>

                <Table aria-label='sample table' stickyHeader>

                    <TableHead>
                        
                        <TableRow>

                            <TableCell className = {styles.tableheadDesign}>ID</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Photo ID</TableCell>
                            <TableCell className = {styles.tableheadDesign}>First Name</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Middle Name</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Last Name</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Marital Status</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Home Address</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Telephone Number</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Mobile Number</TableCell>
                            <TableCell className = {styles.tableheadDesign}>Birth Date</TableCell>

                        </TableRow>

                    </TableHead>


                    <TableBody>
                        {
                            tableData.map(row => (

                            <TableRow key ={row.id}>

                                <TableCell>{row.id}</TableCell>
                                <TableCell><Avatar variant = "square" src = {row.profilePhoto!} className = {styles.avatarDesign}/></TableCell>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.middleName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.maritalStatus}</TableCell>
                                <TableCell>{row.homeAddress}</TableCell>
                                <TableCell>{row.telephoneNumber}</TableCell>
                                <TableCell>{row.mobileNumber}</TableCell>
                                <TableCell>{row.birthDate}</TableCell>
                            
                            </TableRow>

                            ))

                        }
                    
                    </TableBody>

                </Table>              

            </TableContainer>

            </Box>

        )
    }
}

export default TableComponent