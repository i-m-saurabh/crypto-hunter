import React, { Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import {CryptoState} from '../../CryptoContext'
import { Avatar, Button, styled } from '@mui/material';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

export default function UserSiderbar() {
    const Cont = styled('div', {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            width: 350,
            padding: 25,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
    }));

    const Profile = styled('div', {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            height: "92%",
    }));

    const Picture = styled(Avatar, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            width: 200,
            height: 200,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",
            objectFit: "contain",
    }));

    const LogoutBtn = styled(Button, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            height: "8%",
            width: "100%",
            backgroundColor: "#EEBC1D",
            marginTop: 20,
    }));

    const Watchlist = styled('div', {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
            flex: 1,
            width: "100%",
            backgroundColor: "grey",
            borderRadius: 10,
            padding: 15,
            paddingTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            overflowY: "scroll",
    }));    

    const [state, setState] = useState({
        right: false,
    });

    const {user, setAlert} = CryptoState();
    const anchor = 'right';

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successful !",
        });
        toggleDrawer()
    }

    return (
        <Fragment>
            <Avatar 
                onClick={toggleDrawer(anchor, true)}
                style={{
                  height: 38,
                  width: 38,
                  cursor: "pointer",
                  backgroundColor: "#EEBC1D",
                }}
                src={user.photoURL}
                alt={user.displayName || user.email}    
            />
            <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
            >
                <Cont>
                    <Profile>
                        <Picture
                            src={user.photoURL}
                            alt={user.displayName || user.email}
                        />
                        <span
                            style={{
                                width: "100%",
                                fontSize: 25,
                                textAlign: "center",
                                fontWeight: "bolder",
                                wordWrap: "break-word",
                            }}
                        >
                            {user.displayName || user.email}                        
                        </span>
                        <Watchlist>
                            <span style={{fontSize: 15, textShadow: "0 0 5px black"}}>
                                Watchlist
                            </span>

                        </Watchlist>
                    </Profile>
                    <LogoutBtn
                        variant='contained'
                        onClick={logOut}
                    >
                        Logout
                    </LogoutBtn>
                </Cont>
            </Drawer>
        </Fragment>
    )
}