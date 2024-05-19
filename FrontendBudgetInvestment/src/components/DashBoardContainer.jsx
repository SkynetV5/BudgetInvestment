import {useState, useEffect, useRef} from 'react';
import DashBoardContainers from './DashboardContainers';
import "../cssFiles/DashBoardContainers.css";
import Button from './Button';
import { FetchDataUserId, FetchDataUserExpenses, FetchDataUserDeposits, FetchDataUserSavings } from '../http.js';
import { Link, useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';
import ErrorContainer from './ErrorContainer.jsx';


export default function DashBoardContainer(){
    const [userInfo,setUserInfo] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [savings,setSavings] = useState([]);
    const [isFetching,setIsFetching] = useState(false);
    const [errorComponent,setErrorComponent] = useState('');
    const [isError,setIsError] = useState(false);
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const id = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    const loadingText = "Wczytuję dane...";

    useEffect(() =>{
        async function fetchData(){
        try{
            if(isLoggedIn != 'true'){
                navigate('/');
                }
            if( isLoggedIn === 'true'){
                    setIsFetching(true);
                    setUserInfo(await FetchDataUserId(id));

                    setExpenses(await FetchDataUserExpenses(id));

                    setDeposits(await FetchDataUserDeposits(id));
                    
                    setSavings(await FetchDataUserSavings(id));
                    setIsFetching(false);
            }
        }catch(e){
            setErrorComponent(<ErrorContainer>Błąd w pobieraniu danych. Spróbuj ponownie później</ErrorContainer>)
            setIsError(true);
        }
        }
        fetchData();
    }, [])
    let username = '';
    username = userInfo.userName;
    const dateFormatter = new Intl.DateTimeFormat( 'pl', {
        day: 'numeric',
        month: 'long'
    });

    const hourFormatter = new Intl.DateTimeFormat( 'pl', {
        hour: 'numeric'
    });
    const currentlydate = dateFormatter.format(new Date());
    const currentlyHour = hourFormatter.format(new Date());
    let welcomingText = 'Miłego dnia';

    if(currentlyHour < 12){
        welcomingText = "Dzień dobry";
    }
    if(currentlyHour > 18){
        welcomingText = "Dobry wieczór";
    }



    let amount = 0;
    if(deposits.length == 0){
        expenses.forEach(value => {
            amount -= parseFloat(value.expenses);
        });
    }
    else if(expenses.length == 0){
        deposits.forEach(value => {
            amount += parseFloat(value.deposits);
        });
    }
    else{
        expenses.forEach(value => {
            amount -= parseFloat(value.expenses);
        });
        deposits.forEach(value => {
            amount += parseFloat(value.deposits);
        });
    }

    let savingsAmount = 0;
    if(savings.length != 0){
        savings.forEach(value => {
            if(value.addSavings){
                savingsAmount += value.savings;
            }
            if(value.removeSavings){
                savingsAmount -= value.savings;
            }
        })
    }



    return (
        <>
        {isError && errorComponent}
        {!isError && <div id="dashboard-container">
                <motion.h1 initial={{opacity: 0 , y: -60}} animate={{opacity:1 , y: 0}} transition={{duration: 0.6}}>{welcomingText}, {username}!</motion.h1>
                <motion.h3 initial={{opacity: 0 , y: -60}} animate={{opacity:1 , y: 0}} transition={{duration: 0.6}}>Dzisiaj jest {currentlydate}.</motion.h3>
                <DashBoardContainers id={'amount-container'} title={'Konto'} description={'Widzisz tutaj całą wartość swojego konta.'}>
                <div id='box'>
                    <div>
                        <br></br><br></br><br></br><br></br><Link to='/account'><Button classed={"button-click"}>Historia płatności</Button></Link>
                    </div>
                    <div>
                        <p id='amount-text'>Suma na twoim koncie wynosi:</p>
                        {isFetching && <h1 id='amount'>{loadingText}</h1>}
                        {!isFetching && <h1 id='amount'>{amount.toFixed(2)}zł</h1>}
                    
                    </div>
                </div>
                </DashBoardContainers>
                <DashBoardContainers id={'savings-container'} title={'Oszczędności'} description={'Widzisz tutaj całą wartość swoich oszczędności.'} loadingText={loadingText} fetchingLoading={isFetching}>
               
                <div id='box'>
                    <div style={{textAlign: 'center'}}>
                        <br></br><br></br><br></br><br></br><Link to='/savings'><Button classed={"button-click"}>Historia oszczędności</Button></Link>
                    </div>
                    <div>
                     <p id='amount-text'>Suma na twoim koncie wynosi:</p>
                     {isFetching && <h1 id='amount'>{loadingText}</h1>}
                     {!isFetching && <h1 id='amount'>{savingsAmount.toFixed(2)}zł</h1>}
                    
                    </div>
                </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-or-remove-savings-container'} title={'Dodaj/Usuń oszczędności'} description={'Dodaj bądź usuń oszczędności'}>
                    <div>
                    <Link to='/addRemoveSavings'><Button classed={"button-click"}>Dodaj/Usuń Oszczędności</Button></Link>
                    </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-expenses-container'} title={'Dodaj wydatek'} description={'Dodaj nowy wydatek.'}>
                    <div>
                    <Link to='/addExpenses'><Button classed={"button-click"}>Dodaj wydatek</Button></Link>
                    </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-deposits-container'} title={'Dodaj przychód'} description={'Dodaj nowy przychód.'}>
                    <div>
                    <Link to='/addDeposits'><Button classed={"button-click"}>Dodaj przychód</Button></Link>
                    </div>
                </DashBoardContainers>
        </div>}
    </>
    )
}