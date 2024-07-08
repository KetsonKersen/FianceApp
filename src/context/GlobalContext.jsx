import { createContext, useEffect, useState } from "react";
import { User } from "../classes/user";

import sack_dollar from "../assets/IconsTags/sack-dollar.svg"
import hand_holding_dollar from "../assets/IconsTags/hand-holding-dollar.svg"
import piggy_bank from "../assets/IconsTags/piggy-bank.svg"
import coins from "../assets/IconsTags/coins.svg"
import house_solid from "../assets/IconsTags/house-solid.svg"
import graduation from "../assets/IconsTags/graduation.svg"
import gamepad_solid from "../assets/IconsTags/gamepad-solid.svg"
import utensils_solid from "../assets/IconsTags/utensils-solid.svg"
import hand_holding_medical_solid from "../assets/IconsTags/hand-holding-medical-solid.svg"
import bus_solid from "../assets/IconsTags/bus-solid.svg"
import paw_solid from "../assets/IconsTags/paw-solid.svg"
import shirt_solid from "../assets/IconsTags/shirt-solid.svg"
import face_smile_solid from "../assets/IconsTags/face-smile-solid.svg"
import cart_shopping_solid from "../assets/IconsTags/cart-shopping-solid.svg"
import plane_solid from "../assets/IconsTags/plane-solid.svg"
import car_solid from "../assets/IconsTags/car-solid.svg"
import shapes_solid from "../assets/IconsTags/shapes-solid.svg"


const tags = [
    {id: 1, name: "Salario", color: "#006400", icon: sack_dollar},
    {id: 2, name: "Adiantamento", color: "#32CD32", icon: hand_holding_dollar},
    {id: 3, name: "Investimento", color: "#ADFF2F", icon: piggy_bank},
    {id: 4, name: "Renda extra", color: "#3CB371", icon: coins},
    {id: 5, name: "Casa", color: "#00BFFF", icon: house_solid},
    {id: 6, name: "Educação", color: "#7B68EE", icon: graduation},
    {id: 7, name: "Lazer", color: "#FFD700", icon: gamepad_solid},
    {id: 8, name: "Restaurante", color: "#DC143C", icon: utensils_solid},
    {id: 9, name: "Saúde", color: "#00FFFF", icon: hand_holding_medical_solid},
    {id: 10, name: "Transporte", color: "#FFDEAD", icon: bus_solid},
    {id: 11, name: "PET", color: "#FF7F50", icon: paw_solid},
    {id: 12, name: "Vestuario", color: "#4B0082", icon: shirt_solid},
    {id: 13, name: "Cuidados Pessoais", color: "#FF00FF", icon: face_smile_solid},
    {id: 14, name: "Alimentação", color: "#DAA520", icon: utensils_solid},
    {id: 15, name: "Mercado", color: "#6B8E23", icon: cart_shopping_solid},
    {id: 16, name: "Viagem", color: "#DDA0DD", icon: plane_solid},
    {id: 17, name: "Carro", color: "#00FA9A", icon: car_solid},
    {id: 18, name: "Outros", color: "#808080", icon: shapes_solid},
]
export const GlobalContext = createContext()
export const GlobalProvider = ({children})=>{

    const user = new User()
    if(!localStorage.getItem("@theme-mode")){
        localStorage.setItem("@theme-mode", "light")
    }

    //STATE DATA
    const [stateData,setStateData] = useState(JSON.parse(sessionStorage.getItem("@userData")))
    //STATE EARNINGNS
    const [EarningnsSeries,setEarningnsSeries] = useState([])
    const [EarningnsTags,setEarningnsTags] = useState([])
    
    //STATE EXPENSES
    const [ExpensesSeries,setExpensesSeries] = useState([])
    const [ExpensesTags,setExpensesTags] = useState([])

    //OPTIONS EARNINGS
    const [EarningnsOptions,setEarningnsOptions] = useState({})

    //OPTIONS EXPENSES
    const [ExpensesOptions,setExpensesOptions] = useState({})

    function UpdateChart(){
    
        //CONVERT TO ARRAY
        let arrMovements = []
        for(let i in stateData?.movements){
            arrMovements.push(stateData?.movements[i])
        }

        //ARRAYS EARNINGS
        let Earnings = []
        let EarningsColors = []
        let EarningsNames = []
        let EarningsCurrentTags = []
        
        //ARRAYS EXPENSES
        let Expenses = []
        let ExpensesColors = []
        let ExpensesNames = []
        let ExpensesCurrentTags = []

        tags?.forEach((tag)=>{
            let EarningnsValue = 0
            let ExpensesValue = 0
            arrMovements.map((item)=>{
                //ADD TAGS EARNINGS
                if(item.type === "Receita"){
                    if(Number(item.tag.id) === Number(tag.id)){
                        EarningnsValue += Number(item.value)
                        const index = EarningsCurrentTags.indexOf(tag)
                        if(index < 0){
                            EarningsCurrentTags.push(tag)
                        }
                    }
                }
                //ADD TAGS EXPENSES
                if(item.type === "Despesa"){
                    if(Number(item.tag.id) === Number(tag.id)){
                        ExpensesValue += Number(item.value)
                        const index = ExpensesCurrentTags.indexOf(tag)
                        if(index < 0){
                            ExpensesCurrentTags.push(tag)
                        }
                    }
                }
            })
            
            if(EarningnsValue != 0){
                Earnings.push(EarningnsValue)
                EarningsColors.push(tag.color)
                EarningsNames.push(tag.name)
            }
            if(ExpensesValue != 0){
                Expenses.push(ExpensesValue)
                ExpensesColors.push(tag.color)
                ExpensesNames.push(tag.name)
            }

        })
        setEarningnsTags(EarningsCurrentTags)
        setEarningnsSeries(Earnings)

        setExpensesTags(ExpensesCurrentTags)
        setExpensesSeries(Expenses)

        //SET OPTIONS EARNINGNS
        const OP_Earningns = {
            labels: EarningsNames,
            colors: EarningsColors,
            legend: {show: false},
            stroke:{
                width: 0
            }
        }
        setEarningnsOptions(OP_Earningns)
        
        //SET OPTIONS EXPENSES
        const OP_Expenses = {
            labels: ExpensesColors,
            colors: ExpensesColors,
            legend: {show: false},
            stroke:{
                width: 0
            }
            
        }
        setExpensesOptions(OP_Expenses)
        
        if(stateData !== null && stateData !== undefined){
            sessionStorage.setItem("@userData", JSON.stringify(stateData))
            user.UpdateDB(stateData)
        }
    }

    useEffect(()=>{
        UpdateChart()
    },[stateData])

    return (
        <GlobalContext.Provider value={{tags,stateData,setStateData,EarningnsSeries,EarningnsTags,EarningnsOptions,ExpensesSeries,ExpensesTags,ExpensesOptions}}>{children}</GlobalContext.Provider>
    )
}