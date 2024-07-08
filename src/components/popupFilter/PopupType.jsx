import "./style.css"
import Button from "../button/Button"

export default function PopupType(){

    function selected(e){
        const ul = document.querySelectorAll(".type li")
        ul.forEach(li => li.classList.remove("selected"))
        e.classList.add("selected")
    }

    return(
        <div className="container popup-filter type">
            <h2 className="sub-title">Filtrar por:</h2>

            <ul>
                <li onClick={(e)=> selected(e.target)}>Receita</li>
                <li onClick={(e)=> selected(e.target)}>Despesa</li>
            </ul>

            <div className="container-button">
                <Button size="medium" type="active" text="Filtrar"/>
            </div>
        </div>
    )
}