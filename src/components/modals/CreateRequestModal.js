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

function CreateRequestModal({ isOpen, onClose, onCreateRequest, employeeId }) {
    const [request, setRequest] = useState({
        code: '',
        summary: '',
        description: '',
        employeeId: employeeId,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest(prev => ({ ...prev, [name]: value }));
    };

    const classes = useStyles();

    const handleSubmit = async () => {
        setIsLoading(true);
    
        try {
            const created = await onCreateRequest(request);
    
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
                <h2>Create New Request</h2>
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
                        }
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
                        }
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
                        Request created successfully!
                    </Alert>
                </Snackbar>
            </div>
        </Modal>
    );
}

export default CreateRequestModal;
