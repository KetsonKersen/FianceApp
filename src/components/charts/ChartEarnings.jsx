import "./style.css"
import { useContext} from "react";
import { GlobalContext } from "../../context/GlobalContext"
import Chart from 'react-apexcharts'
import Empty from "../empty/Empty";

export default function ChartEarnings(){
    const {EarningnsSeries,EarningnsTags,EarningnsOptions} = useContext(GlobalContext)

    return(
        <div className="container charts">
            <span className="sub-title">Receitas</span>
            <div className="chart">
                {EarningnsSeries.length > 0 ? <Chart width={"230px"} height={"230px"} options={EarningnsOptions} series={EarningnsSeries} type="donut"/> : <Empty/>}
            </div>
            {EarningnsSeries.length > 0 &&
                <div className='container-tags'>
                    <p className="sub-title">Legenda</p>
                    <ul>
                        {EarningnsTags.map((tag)=>{
                            return <li><span style={{backgroundColor: tag.color}}></span>{tag.name}</li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}