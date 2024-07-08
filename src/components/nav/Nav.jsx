import "./style.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { RiMenuFold2Line } from "react-icons/ri";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDonutChartLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoPricetagOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import Modal from "../modal/Modal";
import SetItem from "../setItem/SetItem";
import { User } from "../../classes/user";
import SetGoal from "../setGoal/SetGoal";
import { GlobalContext } from "../../context/GlobalContext";

export default function Nav(){
    const [state_menu,setState_menu] = useState(false)
    const [state_addNewItem,setState_addNewItem] = useState(false)
    const [state_modalEarnings,setState_modalEarnings] = useState(false)
    const [state_modalExpenses,setState_modalExpenses] = useState(false)
    const [state_modaGoal,setState_modalGoal] = useState(false)
    
    const user = new User()    
    
    
    window.addEventListener("resize",()=>{
        if(window.innerWidth <= 1100){
            const navbar = document.querySelector("nav#nav-menu")
            navbar?.classList.remove("active")
            setState_menu(false)
        }
    })
    function OpenCloseMenu(){
        const navbar = document.querySelector("nav#nav-menu")
        navbar.classList.toggle("active")
        setState_menu(!state_menu)
    }


    useEffect(()=>{
        const page = document.querySelector('main')
        page.addEventListener("click",()=>{
            setState_addNewItem(false)
        })
    },[])

    function closeCard(){
        setState_addNewItem(false)
    }

    
    useEffect(()=>{
        const btns = document.querySelectorAll("#nav-menu > div > ul > li")
        const page = window.location.pathname
        function clear(){
            btns.forEach((btn)=> btn.classList.remove("current"))
        }
        switch (page) {
            case "/dashboard":
                clear()
                btns[0].classList.add("current")
                break;
            case "/movements":
                clear()
                btns[1].classList.add("current")
                break;
            case "/goals":
                clear()
                btns[2].classList.add("current")
                break;
            case "/settings":
                clear()
                btns[3].classList.add("current")
                break;
            default:
                break;
        }

    },[window.location.pathname])

    return(
        <nav id="nav-menu">
            <div>
                <button onClick={()=>OpenCloseMenu()}><span>Fechar</span>{state_menu ? <IoClose size={26}/> : <RiMenuFold2Line size={26}/>}</button>
                <div className="button-add-nav">
                    <button onClick={()=>setState_addNewItem(!state_addNewItem)}>
                        <span>Adicionar</span>
                        <FaPlus size={22}/>
                    </button>
                    {state_addNewItem &&
                        <div className="container container-setNewItem">
                            <ul>
                                <li onClick={()=>{
                                    closeCard()
                                    setState_modalEarnings(true)
                                    }}>Receita</li>
                                <li onClick={()=>{
                                    closeCard()
                                    setState_modalExpenses(true)
                                    }}>Despesa</li>
                                <li onClick={()=>{
                                    closeCard()
                                    setState_modalGoal(true)
                                    }}>Meta</li>
                            </ul>
                        </div>
                    }
                </div>

                <ul>
                    <li><Link to="/dashboard"><RiDonutChartLine size={26}/><span>Dashboard</span></Link></li>
                    <li><Link to="/movements"><MdOutlineFormatListBulleted size={26}/><span>Movimentações</span></Link></li>
                    <li><Link to="/goals"><GoGoal size={26}/><span>Metas</span></Link></li>
                    <li><Link to="/settings"><IoSettingsOutline size={26}/><span>Configurações</span></Link></li>
                </ul>
            </div>
            <div className="exit">
                <Link to="/">
                    <button onClick={()=>{
                  
                        user.signOut()
                        }}>
                        <span>Sair</span>
                        <FiLogOut size={26}/>
                    </button>
                </Link>
            </div>
            {state_modalEarnings && <Modal stateClose={setState_modalEarnings} Render={<SetItem type="Receita" setState={setState_modalEarnings}/>}/>}
            {state_modalExpenses && <Modal stateClose={setState_modalExpenses} Render={<SetItem type="Despesa" setState={setState_modalExpenses}/>}/>}
            {state_modaGoal && <Modal stateClose={setState_modalGoal} Render={<SetGoal setState={setState_modalGoal}/>}/>}
        </nav>
    )
}