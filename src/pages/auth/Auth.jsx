import { useState } from "react";
import Login from "../../components/auth/Login";
import "./style.css"
import Register from "../../components/auth/Register";
import devices from "../../assets/devices.png"
import logo from "../../assets/logo-small.png"

export default function Auth() {
  const [state,setState] = useState(true)


  return (
    <main className="auth">
      <div className="container-img">
        <img src={devices} width="100%" alt=""/>
      </div>
      <span className="logo-mobile"><img src={logo} width="100%" alt=""/>FinanceApp</span>

      {state ? <Login setState={setState}/> : <Register setState={setState}/>}
    </main>
  );
}
