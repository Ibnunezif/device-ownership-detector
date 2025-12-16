import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isLoading,setIsLoading] = useState(null);
    const [error,setError] = useState("")
    const {dispatch} = useAuthContext()

    const  login = async (email,password)=>{
        setIsLoading(true)
        setError(null)
        const response = await fetch("https://workout-backend-hzgl.onrender.com/api/user/login",{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body : JSON.stringify({email,password})
        });

        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok){
            dispatch({type:"LOGIN",payload:json})
            localStorage.setItem("user",JSON.stringify(json))
            setIsLoading(false)
            setError(null)
        }
    }
    return {login,isLoading,error}
}
 
