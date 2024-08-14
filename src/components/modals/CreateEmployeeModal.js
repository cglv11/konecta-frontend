import React, { useState } from 'react';
import { Modal, TextField, Button, CircularProgress, Snackbar, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";  
import "./RequestModal.css";

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

function CreateEmployeeModal({ isOpen, onClose, onCreateEmployee }) {
    const [employee, setEmployee] = useState({
        username: '',
        password: '',
        role: 'EMPLOYEE',
        hireDate: '',
        name: '',
        salary: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEmployee(prev => ({
          ...prev,
          [name]: name === "salary" ? (value === '' ? '' : parseFloat(value)) : value
      }));
    };

    const classes = useStyles();

    const handleSubmit = async () => {
        setIsLoading(true);
    
        try {
            const created = await onCreateEmployee({
                ...employee,
                hireDate: new Date(employee.hireDate).toISOString(),
            });
    
            if (created) {
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
                <h2>Create New Employee</h2>
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
                        }
                      }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                      }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={employee.password}
                    onChange={handleInputChange}
                    className="passwordField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        }
                      }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                      }}
                />
                <TextField
                    select
                    label="Role"
                    name="role"
                    value={employee.role}
                    onChange={handleInputChange}
                    className="roleField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        }
                      }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        }
                      }}
                >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                </TextField>
                <TextField
                    label="Hire Date"
                    name="hireDate"
                    type="date"
                    value={employee.hireDate}
                    onChange={handleInputChange}
                    className="hireDateField"
                    variant="filled"
                    InputProps={{
                        classes: {
                          underline: classes.underline,
                        }
                      }}
                    InputLabelProps={{
                        classes: {
                          root: classes.label,
                        },
                        shrink: true
                      }}
                />
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
                        }
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
                    type="number"
                    value={employee.salary}
                    onChange={handleInputChange}
                    className="salaryField"
                    variant="filled"
                    InputProps={{
                        classes: {
                            underline: classes.underline,
                        }
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
                        {isLoading ? <CircularProgress size={24} /> : "Create"}
                    </Button>
                </div>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        Employee created successfully!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}

export default CreateEmployeeModal;
