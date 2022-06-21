import React from 'react'
import student1 from '../../student1.png'
import { useSelector } from 'react-redux';
const Sidebar = () => {
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    const u=JSON.parse(localStorage.getItem('user'))
    function handlelogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.location.href='/'
    }
    return (
         <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <center>
                <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b>User</b></h5></a></li>
                <li><img src={student1} className="imagestyle"/></li>
                <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b>{u.name.toUpperCase()}</b></h5></a></li>
                <li className="nav-item mb-2 "><span onClick={handlelogout}>Logout</span></li>
                </center>
                
            </ul>
       </div>
    )
}
 
export default Sidebar