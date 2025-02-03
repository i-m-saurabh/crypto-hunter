import { AppBar, Container, createTheme, MenuItem, Select, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const Header = () => {

    const navigate = useNavigate();
    const {currency, setCurrency, user} = CryptoState();    

    const CryptoHunterContainer = styled(Typography, {
        shouldForwardProp: (prop) => true,
        })(({ theme }) => ({
        flex: 1,
        color: 'gold',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: 'pointer',
    }));
    
    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            mode: "dark",
        }
    })
    

    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <CryptoHunterContainer 
                            onClick={()=> navigate('/')}
                            variant='h6' 
                        >
                            Crypto Hunter
                        </CryptoHunterContainer>
                        <Select 
                            variant='outlined' 
                            style={{
                                width: 100,
                                height: 40,
                                marginRight:15,
                            }}
                            value={currency}
                            onChange={(e)=>{setCurrency(e.target.value)}}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal /> }
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header