import "./style.css"

export default function Modal(props){
    const {stateClose, Render} = props
    return(
        <div className="bg-modal">
            <div className="container">
                <button className="close" onClick={()=>stateClose(false)}>X</button>
                {Render}
            </div>
        </div> 
    )
}