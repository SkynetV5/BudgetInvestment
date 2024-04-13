import {useState, useEffect} from 'react';
import DashBoardContainers from './DashboardContainers';
import "../cssFiles/DashBoardContainers.css";
import Button from './Button';
export default function DashBoardContainer(){
    const [userInfo,setUserInfo] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [savings,setSavings] = useState([]);
    const id = sessionStorage.getItem('userId');

    useEffect(() =>{
        async function fetchData(){
            try{
                const response = await fetch(`http://localhost:8080/users/id/${id}`)
                const result = await response.json();
                setUserInfo(result);
                
            } catch (e){
                console.error('Błąd podczas pobierania danych:', e);
            }
            try{
                const response = await fetch(`http://localhost:8080/expenses/${id}`);
                const result = await response.json();
                setExpenses(result);
            }catch(e){
                console.error(e);
            }
            try{
                const response = await fetch(`http://localhost:8080/deposits/${id}`);
                const result = await response.json();
                setDeposits(result);
            }catch(e){
                console.error(e);
            }
            try{
                const response = await fetch(`http://localhost:8080/savings/${id}`);
                const result = await response.json();
                setSavings(result);
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
                    <div style={{textAlign: 'center'}}>
                        <br></br><br></br><br></br><br></br><Button classed={"button-login"}>Historia płatności</Button>
                    </div>
                    <div>
                     <p style={{textAlign: 'right', paddingRight: '50px'}}>Suma na twoim koncie wynosi:</p>
                        <h1 style={{textAlign: 'right', paddingRight: '50px'}}>{amount.toFixed(2)}zł</h1>
                    
                    </div>
                </div>
                </DashBoardContainers>
                <DashBoardContainers id={'savings-container'} title={'Oszczędności'} description={'Widzisz tutaj całą wartość swoich oszczędności.'}>
               
                <div id='box'>
                    <div style={{textAlign: 'center'}}>
                        <br></br><br></br><br></br><br></br><Button classed={"button-login"}>Historia oszczędności</Button>
                    </div>
                    <div>
                     <p style={{textAlign: 'left', paddingLeft: '50px'}}>Suma na twoim koncie oszczędnościowym wynosi:</p>
                        <h1 style={{textAlign: 'left', paddingLeft: '50px'}}>{savingsAmount.toFixed(2)}zł</h1>
                    
                    </div>
                </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-or-remove-savings-container'} title={'Dodaj/Usuń oszczędności'} description={'Dodaj bądź usuń oszczędności'}>
                    <div>
                    <Button classed={"button-login"}>Dodaj/Usuń Oszczędności</Button>
                    </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-expenses-container'} title={'Dodaj wydatek'} description={'Dodaj nowy wydatek.'}>
                    <div>
                    <Button classed={"button-login"}>Dodaj wydatek</Button>
                    </div>
                </DashBoardContainers>
                <DashBoardContainers id={'add-deposits-container'} title={'Dodaj przychód'} description={'Dodaj nowy przychód.'}>
                    <div>
                    <Button classed={"button-login"}>Dodaj przychód</Button>
                    </div>
                </DashBoardContainers>
        </div>

    )
}