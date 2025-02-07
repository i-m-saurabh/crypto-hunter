import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Box, styled, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

export default function AuthModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [value, setValue] = useState(0);

    const {setAlert} = CryptoState();

    const Paper = styled('div', {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        width: 400,
        color: "white",
        borderRadius: 10,
        zIndex: 1300, 
        position: "relative",
        pointerEvents: "auto",
    }));

    const ModalContainer = styled(Modal, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const GoogleBox = styled(Box, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            padding: 24,
            paddingTop: 0,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            gap: 20,
            fontSize: 20,
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(res => {
                setAlert({
                    open: true, 
                    message: `Sign Up Successful. Welcome ${res.user.email}`,
                    type: "success"
                });
                handleClose();
            })
            .catch((error) => {
                setAlert({
                    open: true, 
                    message: error.message,
                    type: "error"
                });
                return;          
            })
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
                        
                        <GoogleBox>
                            <span>OR</span>
                            <GoogleButton 
                                style={{ width: "100%", outline: "none" }}
                                onClick={signInWithGoogle}
                            />
                        </GoogleBox>
                    </Paper>
                </Fade>
            </ModalContainer>
        </div>
    );
}
