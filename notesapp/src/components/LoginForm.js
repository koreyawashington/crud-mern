import authStore from "../store/authStore"
import { useNavigate } from "react-router-dom"
export default function LoginForm() {
    const store = authStore()
const navigate = useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault()
await store.login()

//navigate
navigate("/")
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <input 
                onChange={store.updateLoginForm} 
                value={store.loginForm.email} 
                type="email" 
                name="email"
                placeholder="Type your Email here" />
                <input 
                onChange={store.updateLoginForm} 
                value={store.loginForm.password}
                type="password" 
                name="password" 
                placeholder="Type your Password here" />
                <button type="submit">Login</button>
            </form>
            </div>
    )
}