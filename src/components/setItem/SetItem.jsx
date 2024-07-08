import "./style.css"
import Button from "../button/Button"
import { FaCheck } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { Movements_class } from "../../classes/movements";
import { GlobalContext } from "../../context/GlobalContext";

export default function SetItem(props){
    const {deleteItem, item, type, setState} = props
    const {tags,stateData,setStateData} = useContext(GlobalContext)
    const tagsEarnings = []
    const tagsExpenses = []

    for(let i = 0; i < 4; i++){
        tagsEarnings.push(tags[i])
    }
    for(let i = 4; i < tags.length; i++){
        tagsExpenses.push(tags[i])
    }
    
    const movements = new Movements_class()

    const [stateName,SetStateName] = useState(item?.name)
    const [stateDate,SetStateDate] = useState(item?.date)
    const [statePayment,SetStatePayment] = useState(false)
    const [stateValue,SetStateValue] = useState(item?.value)
    const [stateTag,SetStateTag] = useState(item?.tag)
    const [stateSelectTag,SetStateSelectTag] = useState(false)
    
    useEffect(()=>{
        if(item){
            document.querySelector("#checkbox").checked = item.payment;
            SetStatePayment(item.payment)
        }
    },[])
    
    function renderIcon(){
        if(type === "Despesa"){
            return statePayment ? <><FaCheck size={20}/> Foi pago!</> : <> <MdDoNotDisturbAlt size={20}/> Não foi pago!</>
        }
        if(type === "Receita"){
            return statePayment ? <><FaCheck size={20}/> Recebido!</> : <> <MdDoNotDisturbAlt size={20}/> Não foi recebido!</>
        }
        return
    }

    function renderButton(){
        if(item){
            return (
                <div>
                    <Button text="Editar" type="active" size="medium" func={SetNewItem}/>
                    <button className="default-btn medium delete" onClick={()=>{
                        deleteItem(item)
                        close()
                    }}>Excluir</button>
                </div>
            )
        }else{ 
            return <Button text="Adicionar" type="active" size="medium" func={SetNewItem}/>  
        }
    } 

    function close(){
        SetStateName('')
        SetStateDate('')
        SetStatePayment(false)
        SetStateValue('')
        SetStateTag('')
        setState(false)
    }

    function SetNewItem(){
        if((stateName,stateDate,stateValue,stateTag) !== undefined){
            if(item){
                const attItem = {id: item.id, type: type, payment: statePayment, name: stateName, value: stateValue, date: stateDate , tag:stateTag}
                movements.Put(attItem)
                .then((response)=>{ setStateData(response)})
            }else{
                const newItem = {id: Math.floor(Math.random()*9999), type: type, payment: statePayment, name: stateName, value: stateValue, date: stateDate , tag:stateTag}
                movements.Set(newItem)
                .then((response)=>{ setStateData(response)})
            }
            close()
        }else{
            alert("Digite totos os campos!")
        }
    }

    return(
        <div className="content-set">
            <h2 className={type}>{type}</h2>

            <div>
            <input type="text" placeholder="Nome" value={stateName} onChange={(e)=>SetStateName(e.target.value)}/>
            <input type="date" placeholder="Data" value={stateDate} onChange={(e)=>SetStateDate(e.target.value)}/>
            </div>

            <div>
                <span>{renderIcon()}</span>
                <label>
                    <input id="checkbox" onClick={()=>SetStatePayment(!statePayment)} type="checkbox"/>
                    <span class="slide"></span>
                </label>
            </div>

            <div>
                <input type="number" placeholder="Valor" value={stateValue} onChange={(e)=>SetStateValue(e.target.value)}/>
                <div className="selected-tag">
                    {stateSelectTag &&
                        <div className="container tags">
                            <p className="sub-title">Selecione uma tag</p>

                            <ul>
                                <p>Ganhos</p>
                                {tagsEarnings?.map((tag)=>{
                                    return <li onClick={()=>{
                                        SetStateSelectTag(false)
                                        SetStateTag(tag)
                                        }}><span style={{backgroundColor: tag.color}}></span>{tag.name}</li>
                                })}

                                <p>Despesas</p>
                                {tagsExpenses?.map((tag)=>{
                                    return <li onClick={()=>{
                                        SetStateSelectTag(false)
                                        SetStateTag(tag)
                                        }}><span style={{backgroundColor: tag.color}}></span>{tag.name}</li>
                                })}
                                
                            </ul>
                        </div>
                    }
                    <div onClick={()=>SetStateSelectTag(true)}>
                        {stateTag ? <div className="tagSelected">
                                        <span style={{backgroundColor: stateTag.color}}></span>
                                        {stateTag.name}
                                    </div> : "Selecione uma nova tag!"}
                    </div>
                </div>
            </div>
            {renderButton()}
        </div> 
    )
 
}