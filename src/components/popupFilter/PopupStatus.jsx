import "./style.css"
import Button from "../button/Button"

export default function PopupStatus(){

    function selected(e){
        const ul = document.querySelectorAll(".status li")
        ul.forEach(li => li.classList.remove("selected"))
        e.classList.add("selected")
    }

    return(
        <div className="container popup-filter status">
            <h2 className="sub-title">Filtrar por:</h2>

            <ul>
                <li onClick={(e)=> selected(e.target)}>Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
            </ul>

            <div className="container-button">
                <Button size="medium" type="active" text="Filtrar"/>
            </div>
        </div>
    )
}