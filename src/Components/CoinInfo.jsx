import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import axios from 'axios';
import { createTheme, styled, ThemeProvider} from '@mui/system';
import { CircularProgress } from '@mui/material';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
import { Line } from 'react-chartjs-2';
import {chartDays} from '../config/data'
import SelectButton from './SelectButton';

const CoinInfo = ({coin}) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);

    const {currency} = CryptoState();

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            mode: "dark",
        }
    })

    const MainContainer = styled('div')(({ theme }) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]:{
            width: "100%",
            marginTop: 0, 
            padding: 20,
            paddingTop: 0,
        }
    }));
    
    const fetchHistoricData = async()=>{
        const {data} = await axios.get(HistoricalChart(coin?.id, days, currency));
        setHistoricData(data.prices);
    }
    
    useEffect(()=>{
        fetchHistoricData();
    },[currency,days, coin])

    return(
        <ThemeProvider theme={darkTheme}>
            <MainContainer>
                {!historicData ? (
                        <CircularProgress 
                            style={{color: "gold"}}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                        <>
                            <Line 
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time = 
                                            date.getHours() > 12 
                                            ? `${date.getHours()-12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                    datasets:[
                                        {
                                            data: historicData.map((coin)=>coin[1]),
                                            label: `Price (Past ${days} Days) in ${currency}`,
                                            borderColor: "#EEBC1D",
                                        }
                                    ]
                                }}
                                options={{
                                    elements:{
                                        point:{
                                            radius: 1,
                                        }
                                    }
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 20,
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}
                            >
                                {/* Buttons */}
                                {chartDays.map(day => (
                                    <SelectButton
                                        key={day.value} 
                                        onClick={()=>setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>
                        </>
                    )
                }                
            </MainContainer>
        </ThemeProvider>
    )
}

export default CoinInfo