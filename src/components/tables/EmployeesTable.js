import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./EmployeesTable.css";

const EmployeesTable = ({ 
    employees, 
    loading, 
    totalPages, 
    page, 
    onPageChange, 
    onViewClick, 
    onDeleteClick 
}) => {

    return (
        <div className="flexContainer">
            <Paper className="tablePaper">
                <TableContainer className="customTableContainer">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>ID Empleado</TableCell>
                                <TableCell>Nombre de Usuario</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from(new Array(10)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton variant="text" width={20} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={60} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={80} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={150} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={100} /></TableCell>
                                        <TableCell><Skeleton variant="text" width={100} /></TableCell>
                                    </TableRow>
                                ))
                            ) : employees?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>No employees found.</TableCell>
                                </TableRow>
                            ) : (
                                employees?.map((employee, index) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                                        <TableCell>{employee.id}</TableCell>
                                        <TableCell>{employee.username}</TableCell>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.role}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <IconButton 
                                                onClick={() => onViewClick(employee.id)} 
                                                title="View Employee"
                                                className="viewButton" 
                                            >
                                                <VisibilityIcon fontSize="medium" style={{ color: 'white'}} />
                                            </IconButton>
                                            <IconButton 
                                                onClick={() => onDeleteClick(employee.id)} 
                                                title="Delete Employee"
                                                className="deleteButton" 
                                            >
                                                <DeleteIcon fontSize="medium" style={{ color: 'white' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Pagination 
                className="paginationBorder"
                count={totalPages} 
                page={page} 
                onChange={onPageChange} 
            />
        </div>
    );
};

export default EmployeesTable;
