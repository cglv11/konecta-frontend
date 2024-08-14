import React, { useState } from 'react';
import { Modal, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottomColor: "#000000"
      },
      "&&:after": {
        borderBottomColor: "#2297C5"
      }
    },
    label: {     
        "&.Mui-focused": {
            color: "#2297C5"
          }
    }
});

function EmployeeModal({ isOpen, onClose, employeeData, onUpdateEmployee }) {
    
    const [employee, setEmployee] = useState(employeeData);
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const classes = useStyles();

    const handleSubmit = async () => {
        setIsLoading(true);
    
        try {
            const updated = await onUpdateEmployee(employee);
    
            if (updated) {
                setOpenSnackbar(true);
                onClose();
                return;
            } 

        } catch (error) {
            console.log(error);
        }
    
        setIsLoading(false);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modalContent">
                <h2>Employee</h2>
                <div className="fieldsRow">
                    <TextField
                        label="ID"
                        name="id"
                        value={employee.id}
                        className="idField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            readOnly: true
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                        }}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={employee.username}
                        onChange={handleInputChange}
                        className="usernameField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                        }}
                    />
                </div>
                <div className="fieldsRow">
                    <TextField
                        label="Role"
                        name="role"
                        value={employee.role}
                        onChange={handleInputChange}
                        className="roleField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                        }}
                    />
                    <TextField
                        label="Hire Date"
                        name="hireDate"
                        value={new Date(employee.hireDate).toISOString().split('T')[0]}
                        onChange={handleInputChange}
                        className="hireDateField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            type: 'date'
                        }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                        }}
                    />
                </div>
                <TextField
                    label="Name"
                    name="name"
                    value={employee.name}
                    onChange={handleInputChange}
                    className="nameField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                    }}
                />
                <TextField
                    label="Salary"
                    name="salary"
                    value={employee.salary}
                    onChange={handleInputChange}
                    className="salaryField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        },
                        type: 'number'
                    }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                    }}
                />
                <TextField
                    label="Created At"
                    name="createdAt"
                    value={new Date(employee.createdAt).toLocaleString()}
                    className="createdAtField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        },
                    }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                    }}
                />
                <div className="buttonsRow">
                    <Button 
                        onClick={onClose}
                        size="large"
                        variant="outlined"
                        style={{
                            backgroundColor: '#536C79',  
                            color: 'white', 
                            textTransform: 'none'
                        }}
                        disabled={isLoading} 
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        size="large"
                        variant="outlined" 
                        style={{
                            backgroundColor: '#2297C5',  
                            color: 'white',  
                            textTransform: 'none'
                        }}
                        disabled={isLoading}  
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Confirm"}
                    </Button>
                </div>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        Employee updated successfully!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}

export default EmployeeModal;
