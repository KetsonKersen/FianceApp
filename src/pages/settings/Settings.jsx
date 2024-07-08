import "./style.css"
import Button from "../../components/button/Button";
import { TbReload } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { User } from "../../classes/user";

export default function Settings(){
    const user = new User()

    const {stateData,setStateData} = useContext(GlobalContext)

    const [stateNameCheck,setStateNameCheck] = useState(false)
    const [stateName,setStateName] = useState('')


    function update(){
        sessionStorage.setItem("@userData", JSON.stringify(stateData))
        const data = JSON.parse(sessionStorage.getItem("@userData")) 
        setStateData(data)
    }

    function NameChange(){
        if(stateNameCheck){
            alert("Você acabou de alterar o nome, por favor tente mais tarde.")
        }else{
            if(stateName === ''){
                alert("Digite um nome para alterar!")
            }else{
                stateData.name = stateName
                update()
                setStateName('')
                setStateNameCheck(true)
            }
        }
    }
    function toggleTheme(){
        const light = document.querySelector("body.light-mode")
        const dark = document.querySelector("body.dark-mode")
        if(light){
            light.classList.remove("light-mode")
            light.classList.add("dark-mode")
            localStorage.setItem("@theme-mode", "dark")
        }
        if(dark){
            dark.classList.remove("dark-mode")
            dark.classList.add("light-mode")
            localStorage.setItem("@theme-mode", "light")
        }

    }

    useEffect(()=>{
        const theme = localStorage.getItem("@theme-mode")
        const input = document.querySelector("#checkbox")
        
        if(theme === "light"){
            input.checked = false
        }
        if(theme === "dark"){
            input.checked = true
        }
    },[])


    return(
        <main className="settings">
            <div className="container">

                <p className="sub-title">Nome:</p>
                <div>
                    <input type="text" placeholder={stateData?.name} value={stateName} onChange={(e)=>setStateName(e.target.value)}/>
                    <button style={stateNameCheck ? {backgroundColor: "green"} : {}} onClick={()=>NameChange()}>{stateNameCheck ? <FaCheck size={20}/> : <TbReload  size={20}/>}</button>
                </div>
                <div>
                    <p>Alterar tema:</p>
                    {/* <button onClick={()=>toggleTheme()}>TROCA TEMA</button> */}
                    <label>
                        <input id="checkbox" onClick={()=>toggleTheme()} type="checkbox"/>
                        <span class="slide"></span>
                    </label>
                </div>
                <div>
                    <button className="exit" onClick={()=>user.signOut()}>Sair <FiLogOut size={20}/></button>
                </div>
            </div>
        </main>
    )
}