
import { Login } from "../components/Login"
import { Quotes } from "../components/Quotes"



export const Signin=()=>{
    return (
    <>
    <div className="grid grid-cols-2 no-scrollbar">
    <Login/>
    <Quotes/>
    </div>
    </>
    )

}