import Button from "./Button";
import Label from "./Label";
import {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import ErrorContainer from "./ErrorContainer";
import "../cssFiles/ErrorContainer.css";
import SuccessContainer from "./SuccessContainer";
import "../cssFiles/SuccessContainer.css";
import { Link, useNavigate } from "react-router-dom";
import { FetchDataIsExistingEmail, FetchDataIsExistingUser } from "../http.js"

export default function RegisterContainer(){

    const invalidErrors = {
        invalidUserName: false,
        invalidEmail: false,
        invalidFirstName: false,
        invalidLastName: false,
        invalidPassword: false,
        invalidRepeatPassword: false
    }

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[noHashedpassword, setNoHashedPassword] = useState('');
    const[repeatPassword,setRepeatPassword] = useState('');
    const[user,setUser] = useState([]);
    const[userEmail,setUserEmail] = useState([]);
    const[errorContainer, setErrorContainer] = useState('');
    const[successContainer,setSuccessContainer] = useState('');
    const[invalidClass,setInvalidClass] = useState(invalidErrors);
    const[errorBorder,setErrorBorder] = useState('');
    const[isUserAlreadyOnDataBase,setIsUserAlreadyOnDataBase] = useState(false);
    const[isEmailAlreadyOnDataBase,setIsEmailAlreadyOnDataBase] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataUserName(){
            try {
                if(userName != ''){
                setUser(await FetchDataIsExistingUser(userName));
                }
                if(email != ''){
                    setUserEmail(await FetchDataIsExistingEmail(email));
                }
              } catch (error) {
                console.error('Błąd podczas sprawdzania użytkownika w bazie danych:', error);
              }
        }
        fetchDataUserName();
      }, [userName,setUserName, email, setEmail]);

      
      useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if(isLoggedIn === 'true'){
            navigate('/dashboard');
        }
        }, [])

    async function handleClick(e){ 
        e.preventDefault();
        if(user.length != 0 && user != ''){
            setIsUserAlreadyOnDataBase(true);
        }
        else{
            setIsUserAlreadyOnDataBase(false);
        }
        if(userEmail.length != 0 && email != ''){
            setIsEmailAlreadyOnDataBase(true);
        }
        else{
            setIsEmailAlreadyOnDataBase(false);
        }
        if (firstName.length < 3){
            setErrorContainer(<ErrorContainer>Imię jest za krótkie!<br></br> Imię powinno mieć przynajmniej 3 litery </ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidFirstName: true})
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if (lastName.length < 3){
            setErrorContainer(<ErrorContainer>Nazwisko jest za krótkie!<br></br> Nazwisko powinno mieć przynajmniej 3 litery</ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidLastName: true})
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if (userName.length < 4){
            setErrorContainer(<ErrorContainer>Nazwa użytkownika jest za krótka!<br></br> Nazwa użytkownika powinno mieć przynajmniej 4 litery</ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidUserName: true})
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if(isUserAlreadyOnDataBase){
            setErrorContainer(<ErrorContainer>Ta nazwa użytkownika jest już zajęta</ErrorContainer>)
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if(isEmailAlreadyOnDataBase){
            setErrorContainer(<ErrorContainer>Ten email jest już zajęta</ErrorContainer>)
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if (!email.includes('@') || email == ''){
            setErrorContainer(<ErrorContainer>Email nie jest prawidłowy!</ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidEmail: true})
            setErrorBorder(' 2px solid #F94F4F')
        }
        else if (noHashedpassword.length < 8){
            setErrorContainer(<ErrorContainer>Hasło jest za krótkie!<br></br> Hasło powinno mieć przynajmniej 8 litery</ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidPassword: true, invalidRepeatPassword: true})
          
            setErrorBorder(' 2px solid #F94F4F')
        } 
        else if (repeatPassword != noHashedpassword){
            setErrorContainer(<ErrorContainer>Hasła nie są takie same!</ErrorContainer>)
            setInvalidClass({...invalidErrors,invalidPassword: true, invalidRepeatPassword: true})
            setErrorBorder(' 2px solid #F94F4F')
        } 
        else{
            bcrypt.hash(noHashedpassword, 10).then((hash) => {
            const user={firstName,lastName,userName,email,password : hash};
            let response;
            try{
                response = fetch("http://localhost:8080/users/add",{
                    method: "POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(user)
                });
                if(response.ok){
                    setErrorContainer('');
                }
                else{
                    if(response.status === undefined){
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
                        setInvalidClass(invalidErrors)
    
                    }else{
                        setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                    }
                }
            } catch (e){
                setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                
            }
            });
            
         }
    };
    
    

    return <>
        {errorContainer}
        {successContainer}
        <div id="container-register">
            <form>
                <Label>Imię</Label><br></br>
                <input type="text" value={firstName} onChange={(e) =>setFirstName(e.target.value)} style={invalidClass.invalidFirstName ? {border: errorBorder} : null}/><br></br>
                <Label>Nazwisko</Label><br></br>
                <input type="text" value={lastName} onChange={(e) =>setLastName(e.target.value)} style={invalidClass.invalidLastName ? {border: errorBorder} : null}/><br></br>
                <Label>Nazwa Użytkownika</Label><br></br>
                
                <input type="text" value={userName} onChange={(e) =>setUserName(e.target.value)} style={isUserAlreadyOnDataBase || invalidClass.invalidUserName ? {border: errorBorder} : null}/><br></br>
                <Label>Email</Label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} style={(isEmailAlreadyOnDataBase || invalidClass.invalidEmail) ? {border: errorBorder} : null}/><br></br>
                <Label>Hasło</Label>
                <input type="password" value={noHashedpassword} onChange={(e)=>setNoHashedPassword(e.target.value)} style={invalidClass.invalidPassword ? {border: errorBorder} : null}/><br></br>
                <Label>Powtórz Hasło</Label><br></br>
                <input type="password" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} style={invalidClass.invalidRepeatPassword ? {border: errorBorder} : null}/><br></br>
                <div style={{paddingLeft: "75px"}}><Button classed={"button-register"} Click={handleClick}>Zarejestruj się </Button></div>
            </form>
            
        </div>
    </>
}