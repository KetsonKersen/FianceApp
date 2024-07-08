import "./style.css"
import Button from "../button/Button"

export default function PopupDate(){

    return(
        <div className="container popup-filter date">
            <h2 className="sub-title">Filtrar por:</h2>

            <div>
                <div>
                    <span>De:</span>
                    <input type="date"/>
                </div>
                <div>
                    <span>Ate:</span>
                    <input type="date"/>
                </div>
            </div>

            <div className="container-button">
                <Button size="medium" type="active" text="Filtrar"/>
            </div>
        </div>
    )
}