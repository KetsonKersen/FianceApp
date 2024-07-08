import "./style.css"
import Button from "../button/Button"

export default function PopupTags(){

    function selected(e){
        e.classList.toggle("selected")
    }

    return(
        <div className="container popup-filter tags">
            <h2 className="sub-title">Filtrar por:</h2>

            <ul>
                <li onClick={(e)=> selected(e.target)}>Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
                <li onClick={(e)=> selected(e.target)}>Não Pago</li>
            </ul>

            <div className="container-button">
                <Button size="medium" type="active" text="Filtrar"/>
            </div>
        </div>
    )
}