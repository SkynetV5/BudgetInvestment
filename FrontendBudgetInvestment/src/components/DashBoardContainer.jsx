import {useState, useEffect} from 'react';
import DashBoardContainers from './DashboardContainers';
import "../cssFiles/DashBoardContainers.css";
import Button from './Button';
import { FetchDataUserId, FetchDataUserExpenses, FetchDataUserDeposits, FetchDataUserSavings } from '../http.js';
import { Link } from 'react-router-dom';

export default function DashBoardContainer(){
    const [userInfo,setUserInfo] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [savings,setSavings] = useState([]);
    const id = sessionStorage.getItem('userId');

    useEffect(() =>{
        async function fetchData(){
            try{
                setUserInfo(await FetchDataUserId(id));

                setExpenses(await FetchDataUserExpenses(id));

                setDeposits(await FetchDataUserDeposits(id));
                
                setSavings(await FetchDataUserSavings(id));
            }catch(e){
                console.error(e);
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

    const currentlydate = dateFormatter.format(new Date());

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
        <div id="dashboard-container">
                <h1>Dzień dobry, {username}!</h1>
                <h3>Dzisiaj jest {currentlydate}.</h3>
                <DashBoardContainers id={'amount-container'} title={'Konto'} description={'Widzisz tutaj całą wartość swojego konta.'}>
                <div id='box'>
                    <div>
                        <br></br><br></br><br></br><br></br><Link to='/account'><Button classed={"button-click"}>Historia płatności</Button></Link>
                    </div>
                    <div>
                        <p id='amount-text'>Suma na twoim koncie wynosi:</p>
                        <h1 id='amount'>{amount.toFixed(2)}zł</h1>
                    
                    </div>
                </div>
                </DashBoardContainers>
                <DashBoardContainers id={'savings-container'} title={'Oszczędności'} description={'Widzisz tutaj całą wartość swoich oszczędności.'}>
               
                <div id='box'>
                    <div style={{textAlign: 'center'}}>
                        <br></br><br></br><br></br><br></br><Link to='/savings'><Button classed={"button-click"}>Historia oszczędności</Button></Link>
                    </div>
                    <div>
                     <p id='amount-text'>Suma na twoim koncie wynosi:</p>
                        <h1 id='amount'>{savingsAmount.toFixed(2)}zł</h1>
                    
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
        </div>

    )
}