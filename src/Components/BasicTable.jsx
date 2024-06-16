import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function BasicTable({ labels, data, actionLabel, rowAction, ItemAction }) {
    if (data.length > 0) {
        const ObjectKeys = Object.keys(data[0]);

        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                labels.map((label) => <TableCell>{label}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                            >
                                <TableCell align="left"><Button sx={{ background: "white" }} variant="contained" onClick={() => ItemAction(row[ObjectKeys[0]])} >.</Button></TableCell>
                                {
                                    ObjectKeys.map((ObjectKey) => <TableCell align="left">{row[ObjectKey]}</TableCell>)
                                }

                                <TableCell align="left"><Button variant="contained" onClick={() => rowAction(row[ObjectKeys[0]])} >{actionLabel}</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <h1>No Records found</h1>
    }



}