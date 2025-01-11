import { Container, styled, Typography } from '@mui/material';
import React from 'react'
import Carousel from './Carousel';

const Banner = () => {

    const BannerBackground = styled('div')(({ theme }) => ({
        backgroundImage: "url(./banner2.jpg)",
    }));

    const BannerContent = styled(Container)(({ theme }) => ({
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    }));

    const Tagline = styled('div')(({ theme }) => ({
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }));


    return(
        <BannerBackground>
            <BannerContent>
                <Tagline>
                    <Typography 
                        variant='h2' 
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: 'darkgrey',
                            textTransform: 'capitalize',
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favourite Crypto Currency
                    </Typography>
                </Tagline>
                <Carousel />
            </BannerContent>
        </BannerBackground>
    )
}

export default Banner