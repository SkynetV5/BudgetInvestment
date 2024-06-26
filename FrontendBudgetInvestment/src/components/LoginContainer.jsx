import Label from "./Label"
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import {useEffect, useState } from 'react'
import { motion } from "framer-motion"
import bcrypt from 'bcryptjs';
import { FetchDataIsExistingEmail } from '../http.js';
import ErrorContainer from "./ErrorContainer.jsx";


export default function LoginContainer(){

    const[email, setEmail] = useState('');
    const[passwordLogin,setPasswordLogin] = useState('');
    const[user,setUser] = useState([]);
    const[invalidLogin, setInvalidLogin] = useState(false);
    const[errorContainer,setErrorContainer] = useState('');
    const[errorBorder,setErrorBorder] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(email != ''){
        async function fetchData(){
            try {
                setUser(await FetchDataIsExistingEmail(email));
                setInvalidLogin(false);
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
                    else{
                        setErrorContainer(<ErrorContainer>Nieprawidłowy email lub hasło!</ErrorContainer>)
                        setInvalidLogin(true);
                        setErrorBorder(' 2px solid #F94F4F');
                    }
                    if(err){
                        setErrorContainer(<ErrorContainer>Spróbuj ponownie poźniej!</ErrorContainer>)
                    }
                })
    
            } catch(e){
                console.log("xd")
             }
        }
        else{
            setErrorContainer(<ErrorContainer>Nieprawidłowy email lub hasło!</ErrorContainer>)
            setInvalidLogin(true);
            setErrorBorder(' 2px solid #F94F4F')
        }
    }
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if(isLoggedIn === 'true'){
            navigate('/dashboard');
        }
    }, [])
    return(
        <>
        {errorContainer}
        <motion.div id="container-login" initial={{opacity: 0 , y: -30}} animate={{opacity:1 , y: 0}} transition={{duration: 0.5}}>
            <form>
                <Label>Email</Label><br></br>
                <motion.input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} animate={invalidLogin ? {x: [0,-5, 5,0]} : null} transition={invalidLogin ? {duration: 0.5} : null} style={invalidLogin ? {border: errorBorder} : null}/> <br></br>
                <Label>Hasło</Label><br></br>
                <motion.input type="password" value={passwordLogin} onChange={(e)=>setPasswordLogin(e.target.value)} animate={invalidLogin ? {x: [0,-5, 5,0]} : null} transition={invalidLogin ? {duration: 0.5} : null}  style={invalidLogin ? {border: errorBorder} : null}/><br></br>
                <Button classed={"button-login"} Click={handleClick}> Zaloguj się </Button>
                <Link to='/register'><Button classed={"button-register"}> Zarejestruj się  </Button></Link>
            </form>
            <a> Nie pamiętasz hasła ?</a>
        </motion.div>
        </>
    )
}