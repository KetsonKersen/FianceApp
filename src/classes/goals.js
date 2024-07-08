export class Goals_class{
    data = JSON.parse(sessionStorage.getItem("@userData"))

    async SetCurrentGoal(NewGoal){
        this.data.currentGoal = NewGoal 
        sessionStorage.setItem("@userData", JSON.stringify(this.data))
        const attData = JSON.parse(sessionStorage.getItem("@userData"))
        return attData
    }
    
    async DeleteCurrentGoal(){
        this.data.currentGoal = {name: "", TotalValue: 0, currentValue: 0}
        sessionStorage.setItem("@userData", JSON.stringify(this.data))
        const attData = JSON.parse(sessionStorage.getItem("@userData"))
        return attData
    }

    async SetLatestGoal(goal){
        if(!this.data.latestGoals){
            Object.assign(this.data, {latestGoals: []})
        }
        this.data.latestGoals.push(goal)
        sessionStorage.setItem("@userData", JSON.stringify(this.data))
        const attData = JSON.parse(sessionStorage.getItem("@userData"))
        return attData
    }

    async DeleteLatestGoal(index){
        this.data.latestGoals.splice(index, 1)
        sessionStorage.setItem("@userData", JSON.stringify(this.data))
        const attData = JSON.parse(sessionStorage.getItem("@userData"))
        return attData
    }
}