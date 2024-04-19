import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Label from "./Label";
import Button from "./Button";
import ErrorContainer from "./ErrorContainer";
import SuccessContainer from "./SuccessContainer";

export default function Add({title, infoComponent}){

    const data = new Date();
    const day = data.getDate();
    const month = data.getMonth() + 1;
    const year = data.getFullYear(); 
    
    const [methodPayment,setMethodPayment] = useState('Przelew');
    const [titleInfo,setTitleInfo] = useState('');
    const [dateDay,setDateDay] = useState(day);
    const [dateMonth,setDateMonth] = useState(month);
    const [dateYear,setDateYear] = useState(year);
    const [amount, setAmount] = useState(0);
    const [errorContainer, setErrorContainer] = useState('');
    const [successContainer,setSuccessContainer] = useState('');
    const [choiceSavings,setChoiceSavings] = useState('');
    const id = sessionStorage.getItem('userId');

    useEffect(() => {
        const timeout= setTimeout( () => {
            setSuccessContainer(null);
        },3000);

        return () => clearTimeout(timeout);
    }, [successContainer,setSuccessContainer])

    function handleClick(e){
        e.preventDefault();
        if(titleInfo == '' && infoComponent != 'savings'){
            setErrorContainer(<ErrorContainer>Podaj tytuł!</ErrorContainer>)
        }
        else if(choiceSavings == '' && infoComponent === 'savings'){
            setErrorContainer(<ErrorContainer>Wybierz opcje!</ErrorContainer>)
        }
        else if((dateDay > 31 || dateDay < 1) || (dateDay > 29 && dateMonth == 2) || (dateMonth < 1 || dateMonth > 12) || (dateYear < 1900)){
            setErrorContainer(<ErrorContainer>Podaj poprawną datę!</ErrorContainer>)
        }
        else if(amount < 0.01){
            setErrorContainer(<ErrorContainer>Wpisz poprawną kwotę!</ErrorContainer>)
        }
        else{
            let monthWithZero;
            let dayWithZero;
            if(dateMonth < 10){
                monthWithZero = `0${dateMonth}`;
            }
            else{
                monthWithZero = dateMonth;
            }
            if(dateDay < 10){
                dayWithZero = `0${dateDay}`;
            }
            else{
                dayWithZero = dateDay;
            }
            const dateFormat = `${dateYear}-${monthWithZero}-${dayWithZero}`;
            
            try{
                let response;
                let successText = '';
                if(infoComponent === 'expense'){
                    const dataToDataBase = {infoExpenses: methodPayment, user: {id: id}, description: titleInfo, expenses: amount, date: dateFormat}
                    response = fetch("http://localhost:8080/expenses/add", {
                    method: 'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(dataToDataBase)
                    });
                    successText = 'Dodano wydatek.';
                }
                if(infoComponent === 'deposit'){
                    const dataToDataBase = {infoDeposits: methodPayment, user: {id: id}, description: titleInfo, deposits: amount, date: dateFormat}
                    response = fetch("http://localhost:8080/deposits/add", {
                    method: 'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(dataToDataBase)
                    });
                    successText = 'Dodano przychód.';
                }
                if(infoComponent === 'savings'){
                    let isAdd;
                    let isRemove;
                    if(choiceSavings == 'add'){
                        isAdd = true;
                        isRemove = false;
                    }
                    else{
                        isAdd = false;
                        isRemove = true;
                    }
                    const dataToDataBase = {addSavings: isAdd, removeSavings: isRemove,user: {id: id}, description: titleInfo, savings: amount, date: dateFormat}
                    response = fetch("http://localhost:8080/savings/add", {
                    method: 'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(dataToDataBase)
                    });
                    if(isAdd){
                        successText = 'Dodano oszczędności.';
                    }
                    else{
                        successText = 'Usunięto oszczędności.';
                    }
                }
                if(response?.ok){
                    setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                    throw new Error("Failed");
                }
                else{
                    if(response?.status === undefined){
                        setErrorContainer('');
                        setSuccessContainer(<SuccessContainer>{successText}</SuccessContainer>)
                        setAmount(0);
                        setTitleInfo('');
                        setDateDay(day);
                        setDateMonth(month);
                        setDateYear(year);
                        setMethodPayment('Przelew');
                        setChoiceSavings('');
    
                    }
                }
            }catch(e){
                setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
            }
            setErrorContainer('');
        
        }

    }

    let optionCard = null;
    if(infoComponent === 'expense'){
        optionCard =   <option value="Karta">Karta</option>
    }
    let dataForm = <><div>
    <Label>Metoda płatności:</Label><br></br>
    <select id="method-payment" onChange={(e) => setMethodPayment(e.target.value)}>
        <option value="Przelew" >Przelew</option>
        {optionCard}
        <option value="BLIK">BLIK</option>
    </select>
    </div>
    <div><Label>Tytuł:</Label><br></br>
    <textarea id="title" value={titleInfo} onChange={(e) => setTitleInfo(e.target.value) }></textarea>
    </div>
    </>
    
    if(infoComponent === 'savings'){
        dataForm = <>
        <div>
        <Label>Wybierz:</Label><br></br>
        <input type="radio" value='add' name="choice" id="radio"  onChange={(e) => setChoiceSavings(e.target.value)}/>
        <Label>Dodaj</Label><br></br>
        <input type="radio" value='remove' name="choice"  id="radio" onChange={(e) => setChoiceSavings(e.target.value)}/>
        <Label>Usuń</Label>
        </div>
        </>
    }
    
    return (
        <>
        {errorContainer}
        {successContainer}
        <div id="add"> 
            <h1>{title}</h1>
            <div id="add-box">
                <form>
                    {dataForm}
                    <div><Label id="p-data">Data:</Label><br></br>
                        Dzień: <input min='1' max='31' value={dateDay} onChange={(e) => setDateDay(e.target.value) } type="number"/>
                        Miesiąc: <input min='1' max='12' value={dateMonth} onChange={(e) => setDateMonth(e.target.value) } type="number"/>
                        Rok: <input min='1900' value={dateYear} onChange={(e) => setDateYear(e.target.value) } type="number"/>
                    </div>
                    <div>
                        <Label>Kwota:</Label><br></br>
                        <input min="0.01" value={amount} onChange={(e) => setAmount(e.target.value) } type="number"/>
                    </div>
                    <div>
                    <Button classed="button-click" Click={handleClick}>Dodaj</Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}