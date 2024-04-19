import { useNavigate } from "react-router-dom";
import Add from "../components/Add";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import '../cssFiles/Add.css'
import '../cssFiles/ErrorContainer.css';
import { useState, useEffect } from "react";
export default function AddExpenses(){
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if(isLoggedIn === 'false'){
            navigate('/');
        }
        }, [])

    return (
        <>
            <Menu/>
            <Add title="Dodaj wydatek" infoComponent='expense'/>
            <Footer/>
        </>
    )
}