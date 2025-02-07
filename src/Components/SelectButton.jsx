import { styled } from '@mui/material';
import React from 'react'

const SelectButton = ({children, selected, onClick}) => {
    const Selbutton = styled('span')(({ theme }) => ({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" :"",
        fontWeight: selected ? 700 : 500,
        width: "22%",
        "&:hover": {
            backgroundColor: "gold",
            color: "black",
        },
    }));

    return(
        <Selbutton
            onClick={onClick}
        >
            {children}
        </Selbutton>
    )
}

export default SelectButton