import "./style.css"
import img_box from "../../assets/empty.png"
export default function Empty(){
    return(
        <div className="empty">
            <img src={img_box} alt=""/>
            <p>Sem movimentações!</p>
        </div>
    )
}