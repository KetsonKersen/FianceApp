import "./style.css"
import { GlobalContext } from "../../context/GlobalContext"
import { useContext } from "react";

import Chart from 'react-apexcharts'
import Empty from "../empty/Empty";
export default function Balance(){
    const {EarningnsSeries, ExpensesSeries} = useContext(GlobalContext)
    
    function sumTotal(){
        let sumEarnings = 0
        let sumExpenses = 0
        
        EarningnsSeries?.map((value)=>{
            sumEarnings += Number(value) 
        })
        ExpensesSeries?.map((value)=>{
            sumExpenses += Number(value) 
        })
        return <p>{(sumEarnings - sumExpenses).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    }

    function SumEarnings(){
        let sum = 0
        EarningnsSeries.map((value)=>{
            sum += Number(value) 
        })
        return <p>{sum.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    }

    function SumExpenses(){
        let sum = 0
        ExpensesSeries.map((value)=>{
            sum += Number(value) 
        })
        return <p>{(sum * -1).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    }
    const options = {
        labels: ["Despesa","Receita"],
        colors: ["#EF5555", "#68DA40"],
        legend: {show: false},
        stroke:{
            width: 0
        }
    }

    function SumBalance(){
        let Earningns = 0
        let Expenses = 0

        EarningnsSeries.map((value)=>{
            Earningns+= value
        })
        ExpensesSeries.map((value)=>{
            Expenses+=value
        })

        return [Expenses, Earningns]

    }
    
    return(
        <div className="container charts">
            <span className="sub-title">Balanço</span>
            <div className="chart">
                {(ExpensesSeries.length > 0 || EarningnsSeries.length)  > 0 ? <Chart width={"230px"} height={"230px"} options={options} series={SumBalance()} type="donut"/> : <Empty/>}
            </div>
            {(ExpensesSeries.length > 0 || EarningnsSeries.length > 0) &&  
                <div className="math-balance">
                    <p><span>Receitas</span> <span>{SumEarnings()}</span></p>
                    <p><span>Despesas</span> <span>{SumExpenses()}</span></p>
                    <p><span>Receitas</span> <span>{sumTotal()}</span></p>
                </div>
            }
        </div>
    )
}