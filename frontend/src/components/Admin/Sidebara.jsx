import React from 'react'
import admin from '../../admin.png'
import { useDispatch,useSelector} from 'react-redux';
import { loggeduser, loggingout } from '../../store/authenticSlice';
function Sidebar(){
    const dispatch=useDispatch()
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    function handlelogout(){
        
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        dispatch(loggingout())
        window.location.href='/'
    }
    return (
         <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <center>
                <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5><b>ADMIN</b></h5></a></li>
                <li><img src={admin} className="imagestyle"/></li>
                <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b></b></h5></a></li>
                <li className="nav-item mb-2 "><span onClick={handlelogout}>Logout</span></li>
                </center>
                
            </ul>
       </div>
    )
}
 
export default Sidebar