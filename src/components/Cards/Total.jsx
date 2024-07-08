import "./style.css"
import { AiOutlineDollarCircle } from "react-icons/ai";
import { GlobalContext } from "../../context/GlobalContext"
import { useContext } from "react";

export default function Total(){

    const {EarningnsSeries,ExpensesSeries} = useContext(GlobalContext)

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

    return(
        <div className="container total">
            <div>
                <span className="sub-title">Saldo Atual</span>
                {sumTotal()}
            </div>
            <div>
                <AiOutlineDollarCircle size={35}/>
            </div>
        </div>
    )
}