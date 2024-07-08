import "./style.css"
import { useContext, useState } from "react"
import { Goals_class } from "../../classes/goals"
import { GlobalContext } from "../../context/GlobalContext"
import Goal from "../../components/goal/Goal"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import SetGoal from "../../components/setGoal/SetGoal"
import { MdDeleteOutline } from "react-icons/md";

export default function Goals(){
    const goals = new Goals_class()
    const [state_modaGoal,setState_modalGoal] = useState(false)
    const {stateData,setStateData} = useContext(GlobalContext)
    
    //CONVERT TO ARRAY
    let arrGoals = []
    for(let i in stateData?.latestGoals){
        arrGoals.push(stateData.latestGoals[i])
    }


    return(
        <main>
            <h3 className="title">Meta Atual</h3>

            <div className="container current-goal">
                {stateData.currentGoal?.name !== "" ?
                    <Goal Goal={stateData.currentGoal}/>
                    :
                    <div className="container-new-goal">
                        <p className="sub-title">Cadastre uma nova meta!</p>
                        <Button size="medium" text="Criar nova meta" type="active" setState={setState_modalGoal}/>
                    </div>
                }

                {state_modaGoal && <Modal stateClose={setState_modalGoal} Render={<SetGoal setState={setState_modalGoal}/>}/>}
            </div>

            <h3 className="title">Ultimas metas</h3>

            <div className="container latest-goals">
                {arrGoals.map((goal, index)=>{
                    return (
                        <div className="content-latestGoals" key={index}>
                            <Goal Goal={goal}/>
                            <div className="container-btn-latestGoals">
                                <button onClick={()=>{
                                    goals.DeleteLatestGoal(index)
                                    .then((response)=> setStateData(response))
                                }}><MdDeleteOutline size={20}/></button>
                            </div>
                        </div>
                    )
                }).reverse()}
            </div>
        </main>
    )
}