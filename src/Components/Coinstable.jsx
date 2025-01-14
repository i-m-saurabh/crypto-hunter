import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Container, createTheme, LinearProgress, Table, TableCell, TableContainer, TableRow, TableHead, TextField, ThemeProvider, Typography, TableBody, makeStyles } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {numberWithCommas} from './Banner/Carousel'

const Coinstable = () => {
    const navigate = useNavigate(); 
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const {currency, symbol} = CryptoState();

    const fetchCoins = async()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    const handleSearch = () =>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()) 
        )
    }
    
    useEffect(()=>{
        fetchCoins();
    },[currency])

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
            <Container style={{textAlign: "center"}}>
                <Typography
                    variant='h4'
                    style={{margin: 18, fontFamily: "Montserrat"}}
                >
                    Crypto Prices by Market Cap
                </Typography>
                <TextField 
                    label="Search For a Crypto Currency.." 
                    variant='outlined' 
                    style={{marginBottom : 20, width : "100%"}}
                    onChange={(e)=>{setSearch(e.target.value)}}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{background: "gold"}} />
                        ) : (
                            <Table>
                                <TableHead style={{backgroundColor: "#EEBC1D"}}>
                                    <TableRow>
                                        {["Coin" , "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "left" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {handleSearch().map((row)=>{
                                            const profit = row.price_change_percentage_24 > 0;
                                            return(
                                                <TableRow
                                                    onClick={()=> navigate(`/coins/${row.id}`)}
                                                    sx={{
                                                        backgroundColor: "#16171a",
                                                        cursor: "pointer",
                                                        fontFamily: "Montserrat",
                                                        '&:hover':{
                                                            backgroundColor: "#131111"
                                                        }
                                                    }}
                                                    key={row.name}
                                                >
                                                    <TableCell 
                                                        component="th" 
                                                        scope='row' 
                                                        style={{
                                                            display: "flex",
                                                            gap:  15,
                                                        }}
                                                    >
                                                        <img 
                                                            src={row?.image} 
                                                            alt={row?.name}
                                                            height="50"
                                                            style={{marginBottom: 10}} 
                                                        />
                                                        <div style={{display: "flex", flexDirection: "column"}}>
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}                                                            
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{color: "darkgrey"}}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{' '}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: (profit >= 0) ? "rgb(14,203,129)" : "red",
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
            </Container>
        </ThemeProvider>
    )
}

export default Coinstable