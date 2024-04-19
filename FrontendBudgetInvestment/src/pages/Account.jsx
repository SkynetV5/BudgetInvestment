import Menu from "../components/Menu";
import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState } from 'react'
import DashBoardContainer from "../components/DashBoardContainer";
import "../cssFiles/DashBoardContainer.css";
import Footer from "../components/Footer";
import "../cssFiles/Footer.css";
import Lists from "../components/Lists";

function Account(){
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
            <Lists title='Historia płatności' infoComponent='account'/>
            <Footer/>
        </>
    )
}


export default Account;