import "./style.css"
import { FaArrowTrendUp } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"

export default function Earnings(){
    const {EarningnsSeries} = useContext(GlobalContext)

    function SumEarnings(){
        let sum = 0
        EarningnsSeries.map((value)=>{
            sum += Number(value) 
        })
        return <p>{sum.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
    }

    return(
        <div className="container earnings">
            <div>
                <span className="sub-title">Receitas</span>
                {SumEarnings()}
            </div>
            <div>
                <FaArrowTrendUp size={25}/>
            </div>
        </div>
    )
}
