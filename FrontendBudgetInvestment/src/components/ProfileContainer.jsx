import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorContainer from "./ErrorContainer";
import { FetchDataUserId} from '../http.js';
import { motion } from "framer-motion";


export default function ProfileContainer(){
    const [isFetching,setIsFetching] = useState(false);
    const [userInfo,setUserInfo] = useState([]);
    const [errorComponent,setErrorComponent] = useState('');
    const [isError,setIsError] = useState(false);
    const id = sessionStorage.getItem('userId');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const loadingText = "Wczytuje dane...";

    const navigate = useNavigate();
    useEffect(() =>{
        async function fetchData(){
        try{
            if(isLoggedIn != 'true'){
                navigate('/');
                }
            if( isLoggedIn === 'true'){
                    setIsFetching(true);
                    setUserInfo(await FetchDataUserId(id));
                    setIsFetching(false);
            }
        }catch(e){
            setErrorComponent(<ErrorContainer>Błąd w pobieraniu danych. Spróbuj ponownie później</ErrorContainer>)
            setIsError(true);
            console.log(e)
        }
        }
        fetchData();
    }, [])


    console.log(userInfo)
    console.log(isError)
    return (
        <>
        {isError && errorComponent}
        {!isError && <motion.div initial={{y: -30 , opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: 'spring', stiffness: 100}} id="profile">
            <h1>Profil</h1>
            {isFetching && <p>{loadingText}</p>}
            {!isFetching  && <motion.div 
            initial={{x: -60 , opacity: 0}} animate={{x: 0, opacity: 1}}
            id="data">
                <p>Nazwa użytkownika: &nbsp;<b>{userInfo.userName}</b></p>
                <p>Imię: &nbsp;<b>{userInfo.firstName}</b></p>
                <p>Nazwisko: &nbsp;<b>{userInfo.lastName}</b></p>
                <p>Email: &nbsp;<b>{userInfo.email}</b></p>
            </motion.div>}
        </motion.div>}
        </>
    )
}