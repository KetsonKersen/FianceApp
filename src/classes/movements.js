import { getDatabase, ref, child, set, get, update} from "firebase/database";

export class Movements_class{
    data = JSON.parse(sessionStorage.getItem("@userData"))
    
    async Set(item){
        if(!this.data.movements){
            Object.assign(this.data, {movements: []})
        }
        this.data.movements.push(item)
        sessionStorage.setItem("@userData", JSON.stringify(this.data))
        const attData = JSON.parse(sessionStorage.getItem("@userData"))
        return attData
    }

    async Put(attItem){  
        this.data.movements.map((item,index)=>{
            if(item.id == attItem.id){
                this.data.movements.splice(index, 1, attItem)
             }
        })
        return this.data
    }

    async Delete(DeleteItem){
        this.data.movements.map((item,index)=>{
            if(item.id == DeleteItem.id){
                this.data.movements.splice(index, 1)
            }
        })
        return this.data
    }
}