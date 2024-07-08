import { Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { GlobalProvider} from "./context/GlobalContext";
import UserName from "./components/userName/UserName";
import logo from "./assets/logo-small.png"

export default function Layout(){
    
    return(
        <GlobalProvider>
            <Nav/>
            <div className="content">
                <div>
                    <div className="container-logo">
                        <img src={logo} alt=""/>
                        <h1>FinanceApp</h1>
                    </div>
                    <UserName/>
                </div>
                <Outlet/>
            </div>
        </GlobalProvider>
    )
}