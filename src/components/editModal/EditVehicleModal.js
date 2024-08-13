import React, { useState, useContext } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { VehicleContext } from '../../context/VehicleContext';
import { CircularProgress } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import './EditVehicleModal.css';

const useStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottomColor: "#00000"
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

function EditVehicleModal({ isOpen, onClose, vehicleData }) {
    const [vehicle, setVehicle] = useState(vehicleData);
    const { updateVehicle } = useContext(VehicleContext);
    const [isLoading, setIsLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prev => ({ ...prev, [name]: value }));
    };
    const classes = useStyles();

    const handleSubmit = async () => {
        setIsLoading(true);
    
        try {
            const updated = await updateVehicle(vehicle);
    
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
                <h2>Edit Vehicle</h2>
                <div className="fieldsRow">
                    <TextField
                        required
                        label="Year"
                        name="year"
                        value={vehicle.year}
                        onChange={handleInputChange}
                        className="yearField"
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
                        required
                        label="Make"
                        name="make"
                        value={vehicle.make}
                        onChange={handleInputChange}
                        className="makeField"
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
                </div>
                <div className="fieldsRow">
                    <TextField
                        required
                        label="Model"
                        name="model"
                        value={vehicle.model}
                        onChange={handleInputChange}
                        className="makeField"
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
                        required
                        label="Location"
                        name="location"
                        value={vehicle.location}
                        onChange={handleInputChange}
                        className="makeField"
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

                </div>
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
                        variant="contained" 
                        size="large"
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
            
            </Snackbar>
            </div>
        </Modal>
    );
}


export default EditVehicleModal;
