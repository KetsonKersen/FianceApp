import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateEmail, updatePassword, signOut, verifyBeforeUpdateEmail, reauthenticateWithCredential} from "firebase/auth";
import { getDatabase, ref, set, child, get} from "firebase/database";

export class User{

    async GetDB(result){
        const dbRef = ref(getDatabase());
        return await get(child(dbRef, `users/${result?.uid}`))
        .then((snapshot)=>{
            if(snapshot.val() === null){
                return false
            }else{
                sessionStorage.setItem("@userData", JSON.stringify(snapshot.val()))
                return true
            }
            
        })
    }

    async SetDB(name, userID, userEmail){
        const userDB = {
            name: name,
            email: userEmail,
            movements: [],
            currentGoal: {name: "", TotalValue: 0 , currentValue: 0},
            latestGoals: []
        }
        const db = getDatabase();
        await set(ref(db, 'users/'+ userID), userDB)
        .then(()=>{
            sessionStorage.setItem("@userData", JSON.stringify(userDB))
        })
    }

    async UpdateDB(data){
        const db = getDatabase();
        set(ref(db, 'users/' + sessionStorage.getItem("@userID")), data);
    }

    async Login(email,password){
        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, password)
    }

    async Register(name,email,password){
        const auth = getAuth();
        return await createUserWithEmailAndPassword(auth, email, password)
    } 
    async resetPass(email){
        const auth = getAuth()
        return await sendPasswordResetEmail(auth, email)
    }

    signOut(){
        const auth = getAuth();
        signOut(auth)
        sessionStorage.removeItem("@userData")
        sessionStorage.removeItem("@tags")
    }
}