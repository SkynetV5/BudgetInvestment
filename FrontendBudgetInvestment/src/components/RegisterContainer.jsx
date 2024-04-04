import Button from "./Button";
import Label from "./Label";
import {useState, useEffect} from 'react';
import bcrypt from 'bcryptjs';


export default function RegisterContainer(){

    const[firstName,setFirstName] = useState('');
    const[lastName,setLastName] = useState('');
    const[userName,setUserName] = useState('');
    const[email,setEmail] = useState('');
    const[noHashedpassword, setNoHashedPassword] = useState('');
    const[repeatPassword,setRepeatPassword] = useState('');
    const[users,setUsers] = useState([]);
    
    

    function handleClick(e){
        e.preventDefault();
        if (firstName.length < 4){

        }
        else if (lastName.length < 4){

        }
        else if (userName.length < 4){

        }
        else if (!email.includes('@')){

        }
        else if (noHashedpassword.length < 8){

        } 
        else if (repeatPassword != noHashedpassword){

        }
        else{
            const password = bcrypt.hashSync(noHashedpassword, 10);
            const user={firstName,lastName,userName,email,password};
            console.log(user);
            fetch("http://localhost:8080/users/add",{
                method: "POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            }).then(()=>{
                console.log("User dodany");
            })
         }
         
    }
    return <>
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