import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible,AiOutlineLoading3Quarters } from "react-icons/ai";


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const [showPassword,setShowPassword] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }
    

  return (

    <form className="login" onSubmit={handleSubmit}>
      <h3>LOGIN TO ASTU DEVICE SECURITY</h3>
      
      <input 
        type="text" 
        placeholder="Email or phone number"
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        name="email"
        className={error?.email ? "error" : ""}
      />
      {error?.email && <div className="error">{error.email}</div>}
      <div className="password-group">
      <input 
        placeholder="Password"
        type={showPassword ? "text" : "password"} 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        className={error?.password ? "error" : ""}
      />
      <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible size={24}/> : <AiOutlineEye size={24}/>}
        </span>
      </div>
      {error?.password && <div className="error">{error.password}</div>}

      <div className="forgot">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <button disabled={isLoading}>

  {isLoading ? (
    <AiOutlineLoading3Quarters className="spin" size={30} />
  ) : (
    "Login"
  )}
</button>
      
    </form>
  )
}

export default Login