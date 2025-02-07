import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {CryptoState} from '../CryptoContext'
import { SingleCoin } from '../config/api'
import axios from 'axios'
import CoinInfo from '../Components/CoinInfo'
import { Button, LinearProgress, styled, Typography } from '@mui/material'
import parse from 'html-react-parser'
import {numberWithCommas} from "../Components/Banner/Carousel"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Coinpage = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState();
    const {currency, symbol, user, watchlist, setAlert} = CryptoState();

    const inWatchlist = watchlist.includes(coin?.id); 

    const MainContainer = styled('div')(({ theme }) => ({
        display: "flex",
        [theme.breakpoints.down("md")]:{
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const Sidebar = styled('div')(({ theme }) => ({
        width: "30%",
        [theme.breakpoints.down('md')]:{
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    }));

    const Heading = styled(Typography)(({ theme }) => ({
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
    }));
    
    const Desc = styled(Typography)(({ theme }) => ({
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: 'justify',
    }));

    const MarketData = styled('div')(({ theme }) => ({
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down('sm')]:{
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
    }));

    const fetchCoin = async()=>{
        const {data} = await axios.get(SingleCoin(id));
        setCoin(data);
    }
    
    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                {coins: watchlist ? [...watchlist, coin?.id] : [coin?.id]}
            );
            setAlert({
                open: true,
                message: `${coin.name} Added to the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    }

    const removeFromWatchlist = async () =>{
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                {coins: watchlist.filter((watch) => watch !== coin?.id)},
                {merge: "true"}
            );
            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    }

    useEffect(()=>{
        fetchCoin();
        console.log(coin);
    },[id])

    if(!coin)   return <LinearProgress style={{backgroundColor: "gold"}} />

    return(
        <MainContainer>
            <Sidebar>
                <img 
                    src={coin?.image.large} 
                    alt={coin?.name} 
                    height='200' 
                    style={{marginBottom: 20}}
                />
                <Heading variant='h3'>
                    {coin?.name}
                </Heading>
                <Desc variant='subtitle1'>
                    {coin?.description?.en ? parse(coin.description.en.split(".")[0]) : "No description available"}.
                </Desc> 
                <MarketData>
                    <span style={{display: "flex"}}>
                        <Heading variant='h5'>
                            Rank:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Heading variant='h5'>
                            Current Price:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Heading variant='h5'>
                            Market Cap:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography
                            variant='h5'
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}
                            M
                        </Typography>
                    </span>
                    {user && (
                        <Button
                            variant="outlined"
                            style={{
                                width: "100%",
                                height: 40,
                                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                            }}
                            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                        >
                            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                        </Button>
                    )}
                </MarketData>
            </Sidebar>
            {/* {Chart} */}
            <CoinInfo coin={coin} />
        </MainContainer>
    )
}

export default Coinpage