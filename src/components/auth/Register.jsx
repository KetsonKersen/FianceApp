import Button from "../../components/button/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./style.css"
import { useState } from "react";
import { User } from "../../classes/user";
import { useNavigate } from "react-router-dom";
export default function Register(props) {
  const {setState} = props

  const [state_Name,setState_Name] = useState('')
  const [state_Email,setState_Email] = useState('')
  const [state_Pass,setState_Pass] = useState('')
  const [state_R_Pass,setState_R_Pass] = useState('')
  
  const user = new User()
  const navigate = useNavigate()
  function UserRegister(){

    if(state_Name,state_Email,state_Pass,state_R_Pass !== ''){
      if(state_Pass === state_R_Pass){
        user.Register(state_Name,state_Email,state_Pass) 
        .then((userCredential) => {
          user.SetDB(state_Name,userCredential.user.uid,userCredential.user.email)
          .then(()=> navigate("/dashboard"))
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("O endereço de e-mail já está em uso");
            } else if (error.code === "auth/invalid-email") {
                alert("O endereço de e-mail não é válido.");
            } else if (error.code === "auth/weak-password") {
                alert("A senha é muito fraca.");
            }
        })
      }else{
        alert("Verifique novamente a sua senha!")
      }
    }else{
      alert('Preencha todos os campos!')
    }
  }

  
  return (
    <form className="container">
      <p className="btn-back" onClick={()=>setState(true)}><FaArrowLeftLong /> Voltar</p>
      
      {/* <div>
        <p>Bem vindo(a) ao</p>
        <h1>FinanceApp</h1>
      </div> */}

      <h3>Crie uma nova conta!</h3>
      <input onChange={(e)=>setState_Name(e.target.value)} value={state_Name} placeholder="Nome" type="text" required/>
      <input onChange={(e)=>setState_Email(e.target.value)} value={state_Email} placeholder="E-mail" type="email" required/>
      <input onChange={(e)=>setState_Pass(e.target.value)} value={state_Pass} placeholder="Senha" type="password" required/>
      <input onChange={(e)=>setState_R_Pass(e.target.value)} value={state_R_Pass} placeholder="Repita a Senha" type="password" required/>
      <Button type="active" text="Register" size="large" func={UserRegister}/>
    </form>
    
  );
}
