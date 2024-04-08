import Button from "./Button";
import Label from "./Label";
import {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import ErrorContainer from "./ErrorContainer";
import "../cssFiles/ErrorContainer.css";
import SuccessContainer from "./SuccessContainer";
import "../cssFiles/SuccessContainer.css";
import { Link } from "react-router-dom"

export default function RegisterContainer(){

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[noHashedpassword, setNoHashedPassword] = useState('');
    const[repeatPassword,setRepeatPassword] = useState('');
    const[users,setUsers] = useState([]);
    const[errorContainer, setErrorContainer] = useState('');
    const[successContainer,setSuccessContainer] = useState('');
    const[isUserAlreadyOnDataBase,setIsUserAlreadyOnDataBase] = useState(false);
    const[isEmailAlreadyOnDataBase,setIsEmailAlreadyOnDataBase] = useState(false);

    async function handleClick(e){ 
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/users/getAll");
            const result = await response.json();
            setUsers(result);
          } catch (error) {
            console.error('Błąd podczas sprawdzania użytkownika w bazie danych:', error);
          }
        if (firstName.length < 3){
            setErrorContainer(<ErrorContainer>Imię jest za krótkie!<br></br> Imię powinno mieć przynajmniej 3 litery </ErrorContainer>)
        }
        else if (lastName.length < 3){
            setErrorContainer(<ErrorContainer>Nazwisko jest za krótkie!<br></br> Nazwisko powinno mieć przynajmniej 3 litery</ErrorContainer>)
        }
        else if (userName.length < 4){
            setErrorContainer(<ErrorContainer>Nazwa użytkownika jest za krótka!<br></br> Nazwa użytkownika powinno mieć przynajmniej 4 litery</ErrorContainer>)
        }
        else if(isUserAlreadyOnDataBase){
            setErrorContainer(<ErrorContainer>Ta nazwa użytkownika jest już zajęta</ErrorContainer>)
        }
        else if(isEmailAlreadyOnDataBase){
            setErrorContainer(<ErrorContainer>Ten email jest już zajęta</ErrorContainer>)
        }
        else if (!email.includes('@')){
            setErrorContainer(<ErrorContainer>Email nie jest prawidłowy!</ErrorContainer>)
        }
        else if (noHashedpassword.length < 8){
            setErrorContainer(<ErrorContainer>Hasło jest za krótkie!<br></br> Hasło powinno mieć przynajmniej 8 litery</ErrorContainer>)
        } 
        else if (repeatPassword != noHashedpassword){
            setErrorContainer(<ErrorContainer>Hasła nie są takie same!</ErrorContainer>)
        }
        else{
            const password = bcrypt.hashSync(noHashedpassword, 10);
            const user={firstName,lastName,userName,email,password};
            console.log(user);
            let response;
            try{
                response = await fetch("http://localhost:8080/users/add",{
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user)
                }).then(()=>{
                    console.log("User dodany");
                    setErrorContainer('');
                })
            } catch (e){
                console.log(e);
                
            }
            if(response?.ok){
                setErrorContainer('');
            }
            else{
                console.log(`HTTP Response Code: ${response?.status}`)
                if(response?.status === undefined){
                    setErrorContainer('');
                    setSuccessContainer(<SuccessContainer>Dodano użytkownika
                        <br></br>
                        <Link to="/" style={{color: "aliceblue",
                    textDecoration: "underline"}}>Aby się zalogować klinij tutaj.</Link>
                    </SuccessContainer>)
                    setEmail('');
                    setFirstName('');
                    setLastName('');
                    setNoHashedPassword('');
                    setRepeatPassword('');
                    setUserName('');

                }else{
                    setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                }
            }
         }
    };
    
    useEffect(() => {
        let isUserInDatabase = users.some(user => user.userName === userName);
        setIsUserAlreadyOnDataBase(isUserInDatabase);
        let isEmailInDatabase = users.some(user => user.email === email);
        setIsEmailAlreadyOnDataBase(isEmailInDatabase);
      }, [users, userName]);

    return <>
        {errorContainer}
        {successContainer}
        <div id="container-register">
            <form>
                <Label>Imię</Label><br></br>
                <input type="text" value={firstName} onChange={(e) =>setFirstName(e.target.value)} /><br></br>
                <Label>Nazwisko</Label><br></br>
                <input type="text" value={lastName} onChange={(e) =>setLastName(e.target.value)} /><br></br>
                <Label>Nazwa Użytkownika</Label><br></br>
                <input type="text" value={userName} onChange={(e) =>setUserName(e.target.value)} /><br></br>
                <Label>Email</Label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
                <Label>Hasło</Label>
                <input type="password" value={noHashedpassword} onChange={(e)=>setNoHashedPassword(e.target.value)}/><br></br>
                <Label>Powtórz Hasło</Label><br></br>
                <input type="password" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}/><br></br>
                <div style={{paddingLeft: "75px"}}><Button classed={"button-register"} Click={handleClick}>Zarejestruj się </Button></div>
            </form>
            
        </div>
    </>
}