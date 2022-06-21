import { BrowserRouter, Link, Route, Routes,Redirect } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login/Login';
import Register from './components/Register/Register'
import {Admin} from './components/Admin/Admin'
import {User}from './components/User/User'
import {Driver} from  './components/Driver/Driver'
import {useSelector} from 'react-redux'
import {Forgot} from './components/Login/Forgot'
import {Forgotpassword} from './components/Login/Forgotpassword'
import{Otplogin} from './components/Login/Otplogin'
import{Otp} from './components/Login/Otp'
function App() {
    
  const loggeduser=useSelector(state=>state.authentic.loggeduser);
  const token=useSelector(state=>state.authentic.tokenlog);
  return (
    <div className="App">
     <BrowserRouter>

     <Routes>
        
        <Route path="/admin/home" element={<Admin/>} />
        <Route path="/driver/home" element={<Driver/>}/>
        <Route path='/user/home' element={<User/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route exact path='' element={<Login/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/otplogin' element={<Otplogin/>}/>
        <Route exact path='/otpverify' element={<Otp/>}/>
        <Route exact path='/forgotpassword' element={<Forgotpassword/>}/>
        
     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
