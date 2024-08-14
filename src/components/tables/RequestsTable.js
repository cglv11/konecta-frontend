import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Pagination from '@material-ui/lab/Pagination';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./RequestsTable.css";

const RequestsTable = ({ 
    requests, 
    loading, 
    totalPages, 
    page, 
    onPageChange, 
    onViewClick, 
    onEditClick, 
    onDeleteClick, 
    isAdmin 
}) => {

    return (
        <div className="flexContainer">
            <Paper className="tablePaper">
                <TableContainer className="customTableContainer">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Summary</TableCell>
                                <TableCell style={{ textAlign: 'center' }}>Actions</TableCell>
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
                                    </TableRow>
                                ))
                            ) : requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>No requests found.</TableCell>
                                </TableRow>
                            ) : (
                                requests.map((request, index) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                                        <TableCell>{request.employeeId}</TableCell>
                                        <TableCell>{request.code}</TableCell>
                                        <TableCell>{request.summary}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>
                                            <IconButton 
                                                onClick={() => onViewClick(request.id)} 
                                                title="View Request"
                                                className="viewButton" 
                                            >
                                                <VisibilityIcon fontSize="medium" style={{ color: 'white'}} />
                                            </IconButton>
                                            {isAdmin && (
                                                <>
                                                    <IconButton 
                                                        onClick={() => onEditClick(request)} 
                                                        title="Edit Request"
                                                        className="editButton" 
                                                    >
                                                        <EditIcon fontSize="medium"  style={{ color: 'white'}} />
                                                    </IconButton>
                                                    <IconButton 
                                                        onClick={() => onDeleteClick(request.id)} 
                                                        title="Delete Request"
                                                        className="deleteButton" 
                                                    >
                                                        <DeleteIcon fontSize="medium" style={{ color: 'white' }} />
                                                    </IconButton>
                                                </>
                                            )}
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

export default RequestsTable;
