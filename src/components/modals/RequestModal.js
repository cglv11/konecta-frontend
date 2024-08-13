import React, { useState } from 'react';
import { Modal, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
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

function RequestModal({ isOpen, onClose, requestData, isAdmin, onUpdateRequest }) {
    
    const [request, setRequest] = useState(requestData);
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest(prev => ({ ...prev, [name]: value }));
    };

    const classes = useStyles();

    const handleSubmit = async () => {
        if (!isAdmin) return;

        setIsLoading(true);
    
        try {
            const updated = await onUpdateRequest(request);
    
            if (updated) {
                setOpenSnackbar(true);
                onClose();
                return;
            } 

        } catch (error) {
            console.log(error)
        }
    
        setIsLoading(false);
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="modalContent">
                <h2>{isAdmin ? "Edit Request" : "View Request"}</h2>
                <div className="fieldsRow">
                    <TextField
                        label="Employee ID"
                        name="employeeId"
                        value={request.employeeId}
                        onChange={handleInputChange}
                        className="employeeIdField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            readOnly: !isAdmin // Solo permite edición si es admin
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
                        value={new Date(request.createdAt).toLocaleString()}
                        className="createdAtField"
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
                </div>
                <TextField
                        label="Code"
                        name="code"
                        value={request.code}
                        onChange={handleInputChange}
                        className="codeField"
                        variant="filled"
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            readOnly: !isAdmin // Solo permite edición si es admin
                          }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                          }}
                    />
                    <TextField
                        label="Summary"
                        name="summary"
                        value={request.summary}
                        onChange={handleInputChange}
                        className="summaryField"
                        variant="filled"
                        multiline
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            readOnly: !isAdmin // Solo permite edición si es admin
                          }}
                        InputLabelProps={{
                            classes: {
                              root: classes.label,
                            }
                          }}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={request.description}
                        onChange={handleInputChange}
                        className="descriptionField"
                        variant="filled"
                        multiline
                        InputProps={{
                            classes: {
                              underline: classes.underline,
                            },
                            readOnly: !isAdmin // Solo permite edición si es admin
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
                    {isAdmin && (
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
                    )}
                </div>
                <Snackbar 
                    open={openSnackbar} 
                    autoHideDuration={6000} 
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                        Request updated successfully!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}

export default RequestModal;
