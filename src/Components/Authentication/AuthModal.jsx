import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, styled, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AuthModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [value, setValue] = useState(0);

    const Paper = styled('div', {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        width: 400,
        color: "white",
        borderRadius: 10,
    }));

    const ModalContainer = styled(Modal, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    backgroundColor: "#EEBC1D",
                    marginLeft: 15,
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <ModalContainer
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Paper>
                        <AppBar position='static' style={{backgroundColor: "transparent", color: "white" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange} 
                                variant= 'fullWidth'
                                style={{borderRadius: 10}}
                            >
                                <Tab label="Login"  />
                                <Tab label="Sign Up"  />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                    </Paper>
                </Fade>
            </ModalContainer>
        </div>
    );
}
