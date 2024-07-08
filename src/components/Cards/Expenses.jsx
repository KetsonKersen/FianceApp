import "./style.css"
import { FaArrowTrendDown } from "react-icons/fa6";
import { GlobalContext } from "../../context/GlobalContext"
import { useContext } from "react";

export default function Expenses(){

    const {ExpensesSeries} = useContext(GlobalContext)

    function SumExpenses(){
        let sum = 0
        ExpensesSeries.map((value)=>{
            sum += Number(value) 
        })
        return <p>{(sum * -1).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    }

    return(
        <div className="container expenses">
            <div>
                <span className="sub-title">Despesas</span>
                {SumExpenses()}
            </div>
            <div>
                <FaArrowTrendDown  size={25}/>
            </div>
        </div>
    )
}
