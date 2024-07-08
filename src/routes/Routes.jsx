import { Route, Routes} from "react-router-dom"

import Layout from "../Layout"
import Dashboard from "../pages/dashboard/Dashboard"
import Movements from "../pages/movements/Movements"
import Goals from "../pages/goals/Goals"
import Settings from "../pages/settings/Settings"
import Auth from "../pages/auth/Auth"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { getDatabase, ref} from "firebase/database";

export default function Router(){
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            if (user?.uid) {
                const dbRef = ref(getDatabase());
                sessionStorage.setItem("@userID", user.uid) 
            } else {
                sessionStorage.removeItem("@userID") 
                navigate("/")   
            }
        })
    },[])

    useEffect(()=>{
        const theme = localStorage.getItem("@theme-mode")
        if(theme === "light" || null){
          document.querySelector("body").classList.add("light-mode")
        }
        if(theme === "dark"){
          document.querySelector("body").classList.add("dark-mode")
        }
        
    },[])

    return(  
        <Routes>
            <Route index path="/" element={<Auth/>}/>
            <Route element={<Layout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/movements" element={<Movements/>}/>
                <Route path="/goals" element={<Goals/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Route>
        </Routes>
    )
}