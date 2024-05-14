import '../cssFiles/Lists.css';
import { useState, useEffect, useRef } from 'react';
import { motion} from 'framer-motion';
import {FetchDataUserExpenses, FetchDataUserDeposits, FetchDataUserSavings} from '../http.js';
import moment from 'moment';

export default function Lists({title, infoComponent}){
    const id = sessionStorage.getItem('userId');
    const [expenses,setExpenses] = useState([]);
    const [deposits,setDeposits] = useState([]);
    const [savings, setSavings] = useState([]);
    
    useEffect(() => {
        async function FetchData(){
            try{
            if(infoComponent === 'account'){
                setExpenses(await FetchDataUserExpenses(id));
                setDeposits(await FetchDataUserDeposits(id));
            }
            if(infoComponent === 'savings'){
                setSavings(await FetchDataUserSavings(id));
            }
            }
            catch(e){
            }
        }
        FetchData();
    }, [])
    let amount = 0;
    const expensesAndDepositsList = [...expenses, ...deposits];
    expensesAndDepositsList.sort((a,b) => (a.date < b.date) ? 1 : -1);
    savings.sort((a,b) => (a.date < b.date) ? 1 : -1);
    if(infoComponent === 'account'){
    expensesAndDepositsList.forEach(value => {
        if(value.hasOwnProperty('expenses')){
            amount -= value.expenses;
        }
        else{
            amount += value.deposits;
        }
    })
    }
    else{
        savings.forEach(value => {
            if(value.addSavings){
                amount += value.savings;
            }
            else{
                amount -= value.savings;
            }
        })
    }

    return(
        <motion.div id="lists" initial={{opacity: 0 , y: -60}} animate={{opacity:1 , y: 0}} transition={{duration: 0.5, type: 'spring', stiffness: 100}}>
                <h1>{title}</h1>
                {infoComponent === 'account' && expensesAndDepositsList.length === 0 && <p id='description'>Jak narazie nie ma tutaj żadnych wydatków.</p>}
                {infoComponent === 'savings' && savings.length === 0 && <p id='description' >Jak narazie nie ma tutaj żadnych oszczędności.</p>}
                {infoComponent === 'account' && expensesAndDepositsList.map(((data,index) => {
                    const dateString = data.date;
                    const datePayment = moment(dateString);
                    const year = datePayment.year();
                    const day = datePayment.date();
                    const month = datePayment.month() + 1;
                    if(data.hasOwnProperty('expenses')){

                        amount += data.expenses;
                    }
                    else{
                        amount -= data.deposits;
                    }
                    return <motion.div id='listing'
                     key={index}>
                        <motion.div id="data"  initial={{opacity: 0 , x: -30}} animate={{opacity:1 ,x : 0}}>
                            <p>Tytuł: {data.description}</p>
                            {data.hasOwnProperty('infoExpenses') ? <p>Typ: {data.infoExpenses}</p> : <p>Typ: {data.infoDeposits}</p>}
                            <p>Data: {day < 10 ? '0': ''}{day}-{month < 10 ? '0' : ''}{month}-{year}</p>
                            <b><p>{data.hasOwnProperty('expenses') ? parseFloat(amount - data.expenses).toFixed(2) : parseFloat(amount  + data.deposits).toFixed(2) }</p></b>
                        </motion.div>
                        <motion.div id="payment" initial={{opacity: 0 , x: 30}} animate={{opacity:1 ,x : 0}}>
                            <h3>{data.hasOwnProperty('expenses') ? '-'+ data.expenses : '+' + data.deposits }zł</h3>
                        </motion.div>
                    </motion.div>
                }))}
                 {infoComponent === 'savings' && savings.map(((data,index) => {
                    const dateString = data.date;
                    const datePayment = moment(dateString);
                    const year = datePayment.year();
                    const day = datePayment.day();
                    const month = datePayment.month() + 1;
                    if(data.removeSavings){

                        amount += data.savings;
                    }
                    else{
                        amount -= data.savings;
                    }
                    return <motion.div id='listing'
                     key={index}>
                        <motion.div id="data" initial={{opacity: 0 , x: -30}} animate={{opacity:1 ,x : 0}}>
                            <p>Data: {day < 10 ? '0': ''}{day}-{month < 10 ? '0' : ''}{month}-{year}</p>
                            <b><p>{data.removeSavings ? parseFloat(amount - data.savings).toFixed(2) : parseFloat(amount  + data.savings).toFixed(2) }</p></b>
                        </motion.div>
                        <motion.div id="payment" initial={{opacity: 0 , x: 30}} animate={{opacity:1 ,x : 0}}>
                            <h3>{data.removeSavings ? '-'+ data.savings : '+' + data.savings }zł</h3>
                        </motion.div>
                    </motion.div>
                }))}
        </motion.div>
    )
}