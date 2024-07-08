import "./style.css"

export default function Button(props){
    const {size,type,text,func,setState} = props

    function click(e){
        e.preventDefault()
        if(func){
            func()
        }
        if(setState){
            setState(true)
        }
    }

    return(
        <button className={`default-btn ${size} ${type}`} onClick={(e)=>click(e)}>{text}</button>
    )
}