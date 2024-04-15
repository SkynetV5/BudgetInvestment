import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Label from "./Label";
import Button from "./Button";
import ErrorContainer from "./ErrorContainer";
import SuccessContainer from "./SuccessContainer";

export default function Add({title}){

    const data = new Date();
    const day = data.getDate(); // Pobierz dzień
    const month = data.getMonth() + 1; // Pobierz miesiąc (0 - 11, dlatego dodajemy 1)
    const year = data.getFullYear(); // Pobierz rok

    const [methodPayment,setMethodPayment] = useState('Przelew');
    const [titleInfo,setTitleInfo] = useState('');
    const [dateDay,setDateDay] = useState(day);
    const [dateMonth,setDateMonth] = useState(month);
    const [dateYear,setDateYear] = useState(year);
    const [amount, setAmount] = useState(0);
    const [errorContainer, setErrorContainer] = useState('');
    const [successContainer,setSuccessContainer] = useState('');
    const id = sessionStorage.getItem('userId');

    useEffect(() => {
        const timeout= setTimeout( () => {
            setSuccessContainer(null);
        },3000);

        return () => clearTimeout(timeout);
    }, [successContainer,setSuccessContainer])

    function handleClick(e){
        e.preventDefault();
        if(titleInfo == ''){
            setErrorContainer(<ErrorContainer>Podaj tytuł wydatku!</ErrorContainer>)
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
            const expense = {infoExpenses: methodPayment, user: {id: id}, description: titleInfo, expenses: amount, date: dateFormat}
            
            try{
                const response = fetch("http://localhost:8080/expenses/add", {
                    method: 'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(expense)
                });
                if(response.ok){
                    setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                }
                else{
                    if(response?.status === undefined){
                        setErrorContainer('');
                        setSuccessContainer(<SuccessContainer>Dodano wydatek.</SuccessContainer>)
                        setAmount(0);
                        setTitleInfo('');
                        setDateDay(day);
                        setDateMonth(month);
                        setDateYear(year);
                        setMethodPayment('Przelew');
    
                    }else{
                        setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
                    }
                }
            }catch(e){
                setErrorContainer(<ErrorContainer>Coś poszło nie tak! Spróbuj ponownie później.</ErrorContainer>)
            }
            setErrorContainer('');
        }

    }

    return (
        <>
        {errorContainer}
        {successContainer}
        <div id="add"> 
            <h1>{title}</h1>
            <div id="add-box">
                <form>
                    <div>
                    <Label>Metoda płatności:</Label><br></br>
                    <select id="method-payment" onChange={(e) => setMethodPayment(e.target.value)}>
                        <option value="Przelew" >Przelew</option>
                        <option value="Karta">Karta</option>
                        <option value="BLIK">BLIK</option>
                    </select>
                    </div>
                    <div><Label>Tytuł:</Label><br></br>
                    <textarea id="title" value={titleInfo} onChange={(e) => setTitleInfo(e.target.value) }></textarea>
                    </div>
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