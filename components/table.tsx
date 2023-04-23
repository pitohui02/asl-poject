
import { Table, TableHead, TableBody, TableCell, TableContainer, Paper, TableRow  } from "@mui/material"


import tableData from '../record-demo/recordData.json'
import { Component } from "react"
import Image from "next/image"

import styles from '../src/styles/table.module.css'

class TableComponent extends Component {
    render() {

        const thDesign = {
            fontWeight: 'bold'
        }

        const trDesign = {
            width: '150%',
            maxHeight: '700px'
        }

        const photoDesign = {
            width: '50px',
            height: '50px'
        }


        return (

            <TableContainer component = {Paper} className = {styles.tabledesign}>

                <Table aria-label='sample table' stickyHeader>

                    <TableHead>
                        
                        <TableRow>

                            <TableCell sx = {thDesign}>ID</TableCell>
                            <TableCell sx = {thDesign}>First Name</TableCell>
                            <TableCell sx = {thDesign}>Middle Name</TableCell>
                            <TableCell sx = {thDesign}>Last Name</TableCell>
                            <TableCell sx = {thDesign}>Marital Status</TableCell>
                            <TableCell sx = {thDesign}>Home Address</TableCell>
                            <TableCell sx = {thDesign}>Telephone Number</TableCell>
                            <TableCell sx = {thDesign}>Mobile Number</TableCell>
                            <TableCell sx = {thDesign}>Birth Date</TableCell>

                        </TableRow>

                    </TableHead>


                    <TableBody>
                        {
                            tableData.map(row => (

                            <TableRow key ={row.id}>

                                <TableCell>{row.id}</TableCell>
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

        )
    }
}


export default TableComponent