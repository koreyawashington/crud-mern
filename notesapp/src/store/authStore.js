import  create  from "zustand"
import axios from "axios";


const authStore = create((set) => ({
    loggedIn:null,
    loginForm: {
        email:"",
        password: "", 
    },
    signupForm: {
        email:"",
        password: "", 
    },
    updateLoginForm: (event) => {
        const {name, value} = event.target;

        

        set((state) => {
            return {
            loginForm: {
                ...state.loginForm,
                [name]:value,
            }
        }
        })
    },
    updateSigninForm: (event) => {
        const {name, value} = event.target;

        

        set((state) => {
            return {
            signupForm: {
                ...state.signupForm,
                [name]:value,
            }
        }
        })
    },

    login: async (event) => {

        const {loginForm} = authStore.getState()

        
        const response = await axios.post(
            "/login", 
            loginForm, 
            
            )

            set({
                loggedIn: true,
                loginForm:{
                    email:'',
                    password:'',
                }
            })
set({loggedIn: true})

    console.log(response)
    },
    checkAuth:async () => {
        try { 
      await axios.get('/check-authorization',
      {withCredentials: true})
      set({loggedIn:true})  
    }catch (error){
        set({loggedIn: false})
    }
    },
    signup: async() => {
        const {signupForm} = authStore.getState()
const response = await  axios.post('/signup', 
signupForm, 
{withCredentials: true})

set({
    signupForm: {
        email:"", 
        password: "",
    }
})
console.log(response);
    },
    logout: async () => {
       await axios.get('/logout', )
       set({
        loggedIn: false
       })
    }
}))



export default authStore;