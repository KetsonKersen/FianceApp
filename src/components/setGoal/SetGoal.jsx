import "./style.css"
import Button from "../button/Button"
import { useContext, useEffect, useState } from "react";
import { Goals_class } from "../../classes/goals";
import { GlobalContext } from "../../context/GlobalContext";

export default function SetGoal(props){
    const {setState} = props
    const {stateData,setStateData} = useContext(GlobalContext)
    const [stateName,SetStateName] = useState("")
    const [stateValue,SetStateValue] = useState('')

    const goal = new Goals_class()

    function renderButton(){
        if(stateData.currentGoal?.name === ""){
            return <Button text="Criar" type="active" size="medium" func={SetNewGoal}/>
        }else{ 
            return <Button text="Adicionar" type="active" size="medium" func={addValue}/>  
        }
    } 

    function SetNewGoal(){
        const newGoal = {name: stateName, TotalValue: Number(stateValue), currentValue: 0}
        goal.SetCurrentGoal(newGoal)
        .then((response)=>{
            setStateData(response)
            setState(false)
        })
    }

    function addValue(){
        stateData.currentGoal.currentValue += Number(stateValue)
        goal.SetCurrentGoal(stateData.currentGoal)
        .then((response)=>{
            setStateData(response)
            setState(false)
            if(stateData.currentGoal?.currentValue >= stateData.currentGoal?.TotalValue && stateData.currentGoal?.TotalValue > 0){
                alert("Parabens voce atingiu a sua meta!")
                goal.SetLatestGoal(stateData.currentGoal)
                .then((response)=> setStateData(response))
                goal.DeleteCurrentGoal()
                .then((response)=> setStateData(response))
            }
        })
    }

    return(
        
        <div className="content-set">
            <h2>{stateData.currentGoal?.name === "" ? "Crie uma nova meta." : stateData.currentGoal?.name}</h2>
            {stateData.currentGoal?.name === "" &&
                <input type="text" placeholder="Nome" value={stateName} onChange={(e)=>SetStateName(e.target.value)}/>
            }
            <input type="text" placeholder="Valor" value={stateValue} onChange={(e)=>SetStateValue(e.target.value)}/>
            {renderButton()}
        </div> 
    )
 
}