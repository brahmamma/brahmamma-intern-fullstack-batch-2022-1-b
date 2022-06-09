
import React,{useEffect,useState,useRef} from 'react';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import student1 from '../../student1.png'
import admin from '../../admin.png'

function Dashboard(){
    

    
 
    return (
    <div className='d-flex flex-column'>
        <div className='row row-offcanvas row-offcanvas-left'>
            
                <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                        <center>
                        <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5><b>ADMIN</b></h5></a></li>
                        <li><img src={admin} className="imagestyle"/></li>
                        <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b></b></h5></a></li>
                        <li className="nav-item mb-2 "><span >Logout</span></li>
                        </center>
                        
                    </ul>
            </div>
            <div className='col pt-5 mt-3'>
                          
            </div>   
        </div>
    </div>
       
    )
}
 
export default Dashboard