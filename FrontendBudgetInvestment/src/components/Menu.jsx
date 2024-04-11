import { Link,  useNavigate } from "react-router-dom"
import "../cssFiles/Menu.css"
import Button from "./Button"
import {useState} from 'react'

export default function Menu(){

    const navigate = useNavigate();
    function handleClickLogout(){
        sessionStorage.setItem('isLoggedIn', 'false');
        sessionStorage.setItem('userId', null);
        navigate("/");
    }

    return(
        <div id="menu">
            <div><Link>DashBoard</Link></div>
            <div><Link>Wydatki</Link></div>
            <div><Link>Przychody</Link></div>
            <div><Link>Oszczędności</Link></div>
            <div><Button classed="button-logout" Click={handleClickLogout}>Wyloguj</Button></div>
        </div>
    )
}