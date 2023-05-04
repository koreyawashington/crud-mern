import LoginPage from "../pages/LoginPage";
import  NotePage  from "../pages/NotePage";
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import './App.css'
function App() {
 
   

  return (
    <div className="App">
      <BrowserRouter>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
       <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
      <Routes>
        <Route index element={ 
        <RequireAuth>
           <NotePage/>
           </RequireAuth>
        }/>
        <Route path="/login" element={  <LoginPage/>}/>
        <Route path="/signup" element={  <SignupPage/>}/>
        <Route path="/logout" element={  <LogoutPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
