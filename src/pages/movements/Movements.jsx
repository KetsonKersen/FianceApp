
import { useContext, useEffect, useState } from "react";
import "./style.css"
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { Movements_class } from "../../classes/movements";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "../../components/modal/Modal";
import SetItem from "../../components/setItem/SetItem";
import { GlobalContext } from "../../context/GlobalContext";

export default function Movements(){
    const movements = new Movements_class()
    const {tags, stateData,setStateData} = useContext(GlobalContext)

    //CONVERT TO ARRAY
    let arrMovements = []
    for(let i in stateData?.movements){
        arrMovements.push(stateData.movements[i])
    }

    //SET AND EDIT
    const [state_EditItem,setState_EditItem] = useState(false)
    const [stateCurrentItem,setStateCurrentItem] = useState()
    
    //POPUPS
    const [State_PopupStatus,setState_PopupStatus] = useState(false)
    const [State_PopupTags,setState_PopupTags] = useState(false)
    const [State_PopupDate,setState_PopupDate] = useState(false)
    const [State_PopupType,setState_PopupType] = useState(false)
    
    //FILTERS
    const [stateSearch,setStateSearch] = useState("")
   
    const [f_status,set_f_status] = useState("")
    const [f_tag,set_f_tag] = useState("")
    const [f_min_date,set_f_min_date] = useState("")
    const [f_max_date,set_f_max_date] = useState("")
    const [f_type,set_f_type] = useState("")
    const [filter,setFilter] = useState()
    
    //EDIT ITEM
    function EditItem(item){
        setStateCurrentItem(item)
        setState_EditItem(true)
    }

    //DELETE ITEM
    function DeleteItem(item){
        movements.Delete(item)
        .then((response)=>setStateData(response))
    }

    //CLOSE POPUPS
    function closePopUp(){
        setState_PopupStatus(false)
        setState_PopupTags(false)
        setState_PopupDate(false)
        setState_PopupType(false)
    }

    //CLEAR FILTERS
    function clearFilter(){

        setStateSearch("")
        set_f_status("")
        set_f_tag("")
        set_f_min_date("")
        set_f_max_date("")
        set_f_type("")
        closePopUp()
    }

    function ToggleFilter(){
        const filter = document.querySelector(".filter-btns")
        filter.classList.toggle("filter-btns-active")
    }

    useEffect(()=>{
        const options = document.querySelectorAll(".list > li")
        options.forEach((item)=>{
            item.addEventListener("click",()=>{
                options.forEach((item)=> item.classList.remove("selected"))
                item.classList.add("selected")
            })
        })
    })


    return(
        <main className="moviments">
    
            <div className="container-filter">
                <div>
                    <input type="text" placeholder="Pesquisar" value={stateSearch} onChange={(e)=>setStateSearch(e.target.value)}/>
                </div>
                <button onClick={()=>ToggleFilter()} className="btn-mobile-filter">Filtrar</button>
                
                    <ul className="filter-btns">
                        <button onClick={()=>ToggleFilter()}><IoIosArrowDown size={26}/></button>
                        <li>
                            <span className={`${f_status !== "" ? "filterActive" : ""}`} onClick={()=>{
                                closePopUp()
                                setState_PopupStatus(!State_PopupStatus)
                            }}>Status</span>

                            {State_PopupStatus && 
                                <div className="container popup-filter status">
                                    <h2 className="sub-title">Filtrar por:</h2>

                                    <ul className="list">
                                        <li className={`${f_status === true? "selected" : ""}`}
                                        onClick={()=>{set_f_status(true) }}>Pago</li>

                                        <li className={`${f_status === false ? "selected" : ""}`}
                                        onClick={()=>{ set_f_status(false) }}>Não Pago</li>
                                    </ul>
                                </div>    
                            }
                            
                        </li>

                        <li>
                            <span className={`${f_tag !== "" ? "filterActive" : ""}`} onClick={()=>{
                                closePopUp()
                                setState_PopupTags(!State_PopupTags)
                            }}>Tags</span>

                            {State_PopupTags &&
                                <div className="container popup-filter tags">
                                    <h2 className="sub-title">Filtrar por:</h2>
                            

                                    <ul className="list">
                                        {tags?.map((tag, index)=>{
                                            return (
                                                <li key={index} className={`${f_tag === tag.id ? "selected" : ""}`}
                                                onClick={()=>{
                                                    set_f_tag(tag.id)
                                                }}><span style={{backgroundColor: tag.color}}><img src={tag.icon} alt=""/></span>{tag.name}</li>
                                            )
                                        })}
                                    </ul>
                                    
                                </div>
                            }
                        </li>

                        <li>
                            <span className={`${(f_min_date,f_max_date) !== "" ? "filterActive" : ""}`}
                            onClick={()=>{
                                closePopUp()
                                setState_PopupDate(!State_PopupDate)
                            }}>Datas</span>

                            {State_PopupDate && 
                                <div className="container popup-filter date">
                                    <h2 className="sub-title">Filtrar por:</h2>
                        
                                    <div>
                                        <div>
                                            <span>De:</span>
                                            <input className={`${f_min_date !== "" ? "selected" : ""}`} type="date" value={f_min_date}
                                            onChange={(e)=>{set_f_min_date(e.target.value)}}/>
                                        </div>
                                        <div>
                                            <span>Ate:</span>
                                            <input className={`${f_max_date !== "" ? "selected" : ""}`} type="date" value={f_max_date}
                                            onChange={(e)=>{set_f_max_date(e.target.value)}}/>
                                        </div>
                                    </div>

                                </div>
                            }

                        </li>
                        
                        <li>
                            <span className={`${f_type !== "" ? "filterActive" : ""}`}
                            onClick={()=>{
                                closePopUp()
                                setState_PopupType(!State_PopupType)
                            }}>Tipo</span>
                            
                            {State_PopupType && 
                                <div className="container popup-filter type">
                                    <h2 className="sub-title">Filtrar por:</h2>
                        
                                    <ul className="list">
                                        <li className={`${f_type === "Receita" ? "selected" : ""}`}
                                        onClick={()=>{ 
                                            set_f_type("Receita")
                                        }}>Receita</li>
                                        
                                        <li className={`${f_type === "Despesa" ? "selected" : ""}`}
                                        onClick={()=>{ 
                                           set_f_type("Despesa")
                                        }}>Despesa</li>
                                    </ul>

                                </div>
                            }
                            
                        </li>
                    </ul>

                <button onClick={()=>clearFilter()}>Limpar</button>

            </div>

            <table>
                <thead>
                    <tr>
                        <td>Status</td>
                        <td>Nome</td>
                        <td>Valor</td>
                        <td>Data</td>
                        <td>Tags</td>
                        <td>Ações</td>
                        <td className="mobile">Item</td>
                    </tr>
                </thead>
                    <tbody>
                        {
                            arrMovements.map((item,index)=>{
                                
                                //FORMAT DATE STRING
                                const date = item.date?.split("-").reverse().join("/")
                                
                                //REVERSE DATE
                                const DateItem = item.date?.split("-")
                                let DateNum = ""
                                DateItem.map((num)=>{
                                    DateNum+=num
                                })

                                const minDate = f_min_date.split("-")
                                let minDateNum = ""
                                minDate.map((num)=>{
                                    minDateNum += num
                                })

                                const maxDate = f_max_date.split("-")
                                let maxDateNum = ""
                                maxDate.map((num)=>{
                                    maxDateNum += num
                                })
                                
                                if( (item.name.toUpperCase().indexOf(stateSearch.toUpperCase()) >= 0 ? true : false || (stateSearch === ""))&&
                                    (item.payment === Boolean(f_status) || f_status === "") &&
                                    (item.tag.id === f_tag || f_tag === "") && 
                                    (((Number(DateNum) >= Number(minDateNum)) && (Number(DateNum) <= Number(maxDateNum))) || (minDateNum === "" && maxDateNum === "")) && 
                                    (item.type === f_type || f_type === "")
                                ){                                                                  
                                    return (
                                        <tr key={index}>
                                            <td><span style={item.payment ? {background: "var(--Green)"} : {background: "var(--Red)"}}></span></td>
                                            <td>{item?.name}</td>
                                            <td>{Number(item?.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                            <td>{date}</td>
                                            <td className="TDtag"><span style={{background: item.tag?.color}}><img src={item.tag.icon} alt=""/></span>{item.tag?.name}</td>
                                            <td className="actions">
                                                <div onClick={()=>EditItem(item)}><FaRegEdit size={20}/></div>
                                                <div onClick={()=>DeleteItem(item)}><MdDeleteOutline size={20}/></div>
                                            </td>
                                            <td className="mobile" onClick={()=>EditItem(item)}>
                                                <div>
                                                    <span style={{background: item.tag?.color}}><img src={item.tag?.icon} alt=""/></span>
                                                    <p>{item?.name}</p>
                                                </div>
                                                <div>
                                                    <p>{date}</p>
                                                    <p>{Number(item?.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )   
                                }
                            }).reverse()
                            
                        }
                    </tbody>
            </table>
            {state_EditItem && <Modal stateClose={setState_EditItem} Render={<SetItem setState={setState_EditItem} item={stateCurrentItem} deleteItem={DeleteItem} type={stateCurrentItem.type}/>}/>}
        </main>
    )
}