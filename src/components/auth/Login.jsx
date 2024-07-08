import { useContext, useState } from "react";
import Button from "../../components/button/Button";
import "./style.css"
import { User } from "../../classes/user";
import { useNavigate } from "react-router-dom";
import google from "../../assets/pesquisa.png"
import facebook from "../../assets/facebook.png"
import github from "../../assets/github.png"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

export default function Login(props) {
  const {setState} = props

  const [state_Email,setState_Email] = useState('')
  const [state_Pass,setState_Pass] = useState('')

  const user = new User()
  const navigate = useNavigate()

  function settingDB(response, userData){
    if(!response){
      const name = userData.displayName
      const email = userData.email
      const userID = userData.uid
      console.log(user)
      user.SetDB(name,userID,email).then(()=> navigate("/dashboard"))
    }else{
      navigate("/dashboard")
    }
  }


  function UserLogin(){
    if((state_Email,state_Pass) != ''){
      user.Login(state_Email,state_Pass)
      .then((result)=>{
        user.GetDB(result.user)
        .then(()=>{
          navigate("/dashboard")
        })
      }).catch(()=>{
        alert("E-mail ou senha invalida!")
      })
    }else{
      alert('Digite todos os campos para continuar')
    }
  }

  function LoginGoogle(){
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      user.GetDB(result.user)
      .then((response)=> {
        settingDB(response,result.user)
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  function LoginFacebook(){
    const provider = new FacebookAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      // FacebookAuthProvider.credentialFromResult(result);
      user.GetDB(result.user)
      .then((response)=> {
        settingDB(response, result.user)
      })
    })
    .catch((error)=>{
      console.log(error)
    })

  }
  function LoginGitHub(){
    const provider = new GithubAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // GithubAuthProvider.credentialFromResult(result);
        user.GetDB(result.user)
        .then((response)=> {
          settingDB(response,result.user)
        })
      })
      .catch((error)=>{
        console.log(error)
      })

  }
  function ResetPassword(){
    if(state_Email === ''){
      alert("Digite um E-mail valido!")
    }else{
      user.resetPass(state_Email)
      .then(()=>{alert("Um E-mail foi enviado para: "+ state_Email)})
      .catch((error)=>{
        alert(error)
      })
    }

  }

  return (
    <form className="container">
      {/* <div>
        <p>Bem vindo(a) ao</p>
        <h1>FinanceApp</h1>
      </div> */}

      <h3>Faça o login com a sua conta!</h3>
      <input onChange={(e)=>setState_Email(e.target.value)} value={state_Email} placeholder="E-mail" type="email" required/>
      <input onChange={(e)=>setState_Pass(e.target.value)} value={state_Pass} placeholder="Senha" type="password" required/>
      <p onClick={()=>ResetPassword()}>Esqueci minha senha</p>
      <Button type="active" text="Login" size="large" func={UserLogin}/>

      <button className="createAccount" onClick={()=>setState(false)}>Criar uma nova conta</button>

      <div className="optionsAccount">
      <p>Entre também com</p>
      <div>
          <div onClick={()=>LoginGoogle()}><img src={google} alt=""  width={30}/></div>
          <div onClick={()=>LoginFacebook()}><img src={facebook} alt=""  width={30}/></div>
          <div onClick={()=>LoginGitHub()}><img src={github} alt=""  width={32}/></div>
      </div>
      </div>
    </form>
  );
}
