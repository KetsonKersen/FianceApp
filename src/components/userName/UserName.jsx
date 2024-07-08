
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import "./style.css"

export default function UserName(){
    const {stateData,setStateData} = useContext(GlobalContext)
    return(
        <div className="container-name">
            <span>{stateData?.name.substr(0,1).toUpperCase()}</span>
            <p>{stateData?.name}</p> 
            {/* <IoIosArrowDropdown  size={20}/> */}
        </div>
    )
}