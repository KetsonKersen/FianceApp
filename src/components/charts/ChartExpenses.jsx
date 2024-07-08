import "./style.css"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import Chart from 'react-apexcharts'
import Empty from "../empty/Empty"

export default function ChartExpenses(){

    const {ExpensesSeries,ExpensesOptions,ExpensesTags} = useContext(GlobalContext)
 
    return(
        <div className="container charts">
            <span className="sub-title">Despesas</span>
            <div className="chart">
                {ExpensesSeries.length > 0 ? <Chart width={"230px"} height={"230px"} options={ExpensesOptions} series={ExpensesSeries} type="donut"/> : <Empty/>}
            </div>
            {ExpensesSeries.length > 0 && 
                <div className='container-tags'>
                    <p className="sub-title">Legenda</p>
                    <ul>
                        {ExpensesTags.map((tag,index)=>{
                            return <li key={index}><span style={{backgroundColor: tag.color}}></span>{tag.name}</li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}