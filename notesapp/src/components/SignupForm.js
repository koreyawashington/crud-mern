import React from 'react'
import authStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
export default function SignupForm() {
    const store= authStore()
const navigate = useNavigate()
    const handleSignup = async (event) => {
        event.preventDefault()
       await store.signup()
       navigate('/login')
    }
  return (
    <div>
            <form onSubmit={handleSignup}>
                <input 
                onChange={store.updateSignupForm} 
                value={store.signupForm.email} 
                type="email" 
                name="email" />
                <input 
                onChange={store.updateSignupForm} 
                value={store.signupForm.password}
                type="password" 
                name="password" />
                <button type="submit">Signup</button>
            </form>
            </div>
  )
}
