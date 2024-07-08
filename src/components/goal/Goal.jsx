import "./style.css"

export default function Goal(props){
    const {Goal} = props
    let percent = Math.floor((Goal?.currentValue / Goal?.TotalValue) * 100)
    if(Goal?.currentValue === 0){
        percent = 0
    }
    if(percent > 100){
        percent = 100
    }
    
    return(
        <div className="goal">
            <div className="container-txt">
                <div>
                    <p className="sub-title">Meta</p>
                    <p>{Goal?.name}</p>
                </div>
                <span className="percent">{percent ? percent : "0"}%</span>
                <div>
                    <p className="sub-title">Valor</p>
                    <p>{Goal?.TotalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                </div>
            </div>
            <div className="container-bar">
                <div className="bar" style={{width: `${percent}%`}}>
                    {percent >= 4 ? <span>{Goal?.currentValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span> : ""}
                </div>
            </div>
        </div>
    )

}