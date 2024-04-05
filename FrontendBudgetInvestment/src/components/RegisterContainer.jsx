import Button from "./Button";
import Label from "./Label";
import {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';
import ErrorContainer from "./ErrorContainer";
import "../cssFiles/ErrorContainer.css";


export default function RegisterContainer(){

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[noHashedpassword, setNoHashedPassword] = useState('');
    const[repeatPassword,setRepeatPassword] = useState('');
    const[users,setUsers] = useState([]);
    const[errorContainer, setErrorContainer] = useState('');
    

    async function handleClick(e){
        e.preventDefault();
        if (firstName.length < 3){
            setErrorContainer(<ErrorContainer>Imię jest za krótkie!<br></br> Imię powinno mieć przynajmniej 3 litery </ErrorContainer>)
        }
        else if (lastName.length < 3){
            setErrorContainer(<ErrorContainer>Nazwisko jest za krótkie!<br></br> Nazwisko powinno mieć przynajmniej 3 litery</ErrorContainer>)
        }
        else if (userName.length < 4){
            setErrorContainer(<ErrorContainer>Nazwa użytkownika jest za krótka!<br></br> Nazwa użytkownika powinno mieć przynajmniej 4 litery</ErrorContainer>)
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
                }else{
                    setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                }
            }
         }
         
    }
    return <>
        {errorContainer}
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