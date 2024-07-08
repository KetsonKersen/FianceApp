import React, { useContext, useEffect, useState } from "react";
import "./style.css"
import Total from "../../components/Cards/Total";
import Earnings from "../../components/Cards/Earnings";
import Expenses from "../../components/Cards/Expenses";
import Balance from "../../components/balance/Balance";
import ChartEarnings from "../../components/charts/ChartEarnings";
import ChartExpenses from "../../components/charts/ChartExpenses";
import Goal from "../../components/goal/Goal";
import SetGoal from "../../components/setGoal/SetGoal";
import Modal from "../../components/modal/Modal";
import { Goals_class } from "../../classes/goals";
import Button from "../../components/button/Button";
import { GlobalContext } from "../../context/GlobalContext";

export default function Dashboard(){
    const {stateData,setStateData} = useContext(GlobalContext)
    const [state_modaGoal,setState_modalGoal] = useState(false)
    
    return(
        <main>
            <div className="dashboard">
                <Total/>
                <Earnings/>
                <Expenses/>
                <Balance/>
                <ChartEarnings/>
                <ChartExpenses/>
                <div className="container">
                    {stateData?.currentGoal?.name !== "" ?
                        <Goal Goal={stateData?.currentGoal}/>
                        :
                        <div className="container-new-goal">
                            <p className="sub-title">Cadastre uma nova meta!</p>
                            <Button size="medium" text="Criar nova meta" type="active" setState={setState_modalGoal}/>
                        </div>
                    }

                    {state_modaGoal && <Modal stateClose={setState_modalGoal} Render={<SetGoal setState={setState_modalGoal}/>}/>}
                </div>
            </div> 
        </main>
    )
}