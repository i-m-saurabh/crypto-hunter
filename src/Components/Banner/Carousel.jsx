import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const {currency, symbol} = CryptoState();

    const CarouselContainer = styled('div')(({ theme }) => ({
        height: '50%',
        display: "flex",
        alignItems: "center",
    }));

    const CarouselItem = styled(Link)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    }));

    const fetchTrendingCoins = async()=>{
        const {data} = await axios.get(TrendingCoins(currency));
        console.log(data);
        setTrending(data);
    };

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);


    const items = trending.map((coin)=>{
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <CarouselItem>
                <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom : 10}} />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span 
                        style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CarouselItem>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return(
        <div>
            <CarouselContainer>
                <AliceCarousel 
                    mouseTracking
                    infinite
                    autoPlayInterval={1000}
                    animationDuration={1500}
                    disableDotsControls
                    disableButtonsControls
                    responsive={responsive}
                    autoPlay
                    items={items}
                />
            </CarouselContainer>
        </div>
    )
}

export default Carousel