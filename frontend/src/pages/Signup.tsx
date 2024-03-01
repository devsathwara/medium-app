
import { Quotes } from "../components/Quotes"
import { Register } from "../components/Register"


export const Signup=()=>{
    return (
    <>
    <div className="grid grid-cols-2">
    <Register/>
    <Quotes/>
    </div>
    </>
    )

}