import Label from "./Label"
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState } from 'react'
import bcrypt from 'bcryptjs';
import { FetchDataIsExistingEmail } from '../http.js';



export default function LoginContainer(){

    const[email, setEmail] = useState('');
    const[passwordLogin,setPasswordLogin] = useState('');
    const[user,setUser] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if(email != ''){
        async function fetchData(){
            try {
                setUser(await FetchDataIsExistingEmail(email));
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
            }
        }
        fetchData();
        }
    }, [email,setEmail])

    async function handleClick(e){
        e.preventDefault();
        if(email != ''){
            try{
                const userPassword  = user.map(userPassword => userPassword.password).toString();
                bcrypt.compare(passwordLogin,userPassword, (err,result) => {
                    if(result == true){
                    sessionStorage.setItem('isLoggedIn', 'true');
                    const userId = user.map(userId => userId.id).toString();
                    sessionStorage.setItem('userId', userId);
                    navigate("/dashboard");
                    }
                    if(err){
                        console.log(err);
                    }
                })
    
            } catch(e){
                    console.log(e);
             }
    
        
       
        }
    }
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if(isLoggedIn === 'true'){
            navigate('/dashboard');
        }
    }, [])
    return(
        <div id="container-login">
            <form>
                <Label>Email</Label><br></br>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/> <br></br>
                <Label>Hasło</Label><br></br>
                <input type="password" value={passwordLogin} onChange={(e)=>setPasswordLogin(e.target.value)}/><br></br>
                <Button classed={"button-login"} Click={handleClick}> Zaloguj się </Button>
                <Link to='/register'><Button classed={"button-register"}> Zarejestruj się  </Button></Link>
            </form>
            <a> Nie pamiętasz hasła ?</a>
        </div>
    )
}