import Menu from "../components/Menu";
import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState } from 'react'
import DashBoardContainer from "../components/DashBoardContainer";
import "../cssFiles/DashBoardContainer.css"


function DashBoard(){
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        if(isLoggedIn === 'false'){
            navigate('/');
            }
        }, [])
    return(
        <> 
            <Menu/>
            <DashBoardContainer/>
        </>
    )
}

export default DashBoard;