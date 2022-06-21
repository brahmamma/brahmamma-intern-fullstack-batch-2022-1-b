import React,{useEffect,useState,useRef} from 'react';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import student1 from '../../student1.png'
import admin from '../../admin.png'
import {Dropdown} from 'react-bootstrap';
import walstore from '../../walstore.png'; 

import { getallorders,selection,getselectedorders,getroutes,setroute,delivered,cancelled,updateprofile,deselection} from '../../store/driverSlice';
function Dashboard(){
    
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    const u=JSON.parse(localStorage.getItem('user'))
    function handlelogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.location.href='/'
    }
    function handlehome(){
        window.location.reload()
    }
    const [editprofile,seteditprofile]=useState({}) 
    var [s,sets]=React.useState(0)
    const [pd,setpd]=useState(0)
    const [pds,setpds]=useState(0)
    const [pdst,setpdst]=useState(0)
    const [rt,setrt]=useState(0)
    const dispatch=useDispatch();
    const allorders=useSelector((state)=>state.driver.allorders[0])
    const selectedorders=useSelector((state)=>state.driver.selectedorders[0])
    const routes=useSelector((state)=>state.driver.routes[0])

    function handleallorders(){
        sets(0)
    }
    function handleselectedorders(){
       
        sets(2)

    }
    useEffect(()=>{
        dispatch(getallorders())
        dispatch(getselectedorders())
        
       

    },[dispatch])
    
    function  handleselect(id){
        dispatch(selection(id))
        window.location.reload()
        
       
     }
     function  handledeselect(id){
        dispatch(deselection(id))
        window.location.reload()
        
       
     }
     
     function handlecreateroute(){
        if(selectedorders.length===0){
            alert("please choose orders to create route")
            sets(0)
        }
        else if(routes && selectedorders.length===routes.length)
        {
            alert("You have already created the route,You will be able to create new route after compelting this route only...")
        }
        else{
            dispatch(setroute())
           
        }  
     }
     function handleshowroute(){
            dispatch(getroutes())
            if(rt===0){
                
                setrt(1)
                //sets(2)
            }
            else{
                setrt(0)
                
            }

       
        
     }
     function handledeliver(pres,next,i,l){
        window.location.reload()
        dispatch(delivered(pres,next,i,l))
        sets(2)
        setrt(1)
        


     }
     function handlecancel(pres,next,i,l){
        window.location.reload()
        dispatch(cancelled(pres,next,i,l))
        
        sets(2)
        setrt(1)
        
        

     }

     function handleeditprofile(u){
        seteditprofile(u)
        sets(1)

    }
    function handleupdateprofile(){
        dispatch(updateprofile(editprofile))

    }
    

    return (
    <div className='container-fluid'>
        <div className='row '>
        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
                
                <div class="navbar-collapse collapse" id="collapsingNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" onClick={handlehome}>Home <span class="sr-only">Home</span></a>
                        </li>
                        
                    </ul>
                    
                </div>
                <li className="nav-item mb-2 mt-3"><a ><h5><b></b></h5></a></li>
                <center><h4 className='topbar'><i><img src={walstore} className="imagelogo"/>Wal</i></h4></center>
                <Dropdown >
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {u.name.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item ></Dropdown.Item>
                    <Dropdown.Item onClick={()=>{handleeditprofile(u)}}>Edit Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handlelogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
        
          
     
            </nav>
            
                <div className="col-md-3 col-xs-12  col-lg-2 sidebar-offcanvas pl-0 side sticky-top " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3">
                        <center>
                        <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5><b>DRIVER</b></h5></a></li>
                        <li><img src={student1} className="imagestyle"/></li>
                        <li className={s===0?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"} onClick={handleallorders}><a className="nav-link text-secondary" ><h5>ALL ORDERS</h5></a></li>
                        <li className={s===2?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"} onClick={handleselectedorders}><a className="nav-link text-secondary"><h5>SELECTED & ROUTE</h5></a></li>
                        
                        
                        </center>
                        
                    </ul>
            </div>
            <div className='col-md-9 col-sm-12 pt-5 mt-3'>
                    <div className={(s===0 && s!==1 && s!==2)?'dis':'hide'}>
                        <table className='table table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2 w-100'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Customer Name</th>
                                                <th>Phone Number</th>
                                                <th>Address</th>
                                                <th>Order ID</th>
                                                <th onClick={()=>{pd===1?setpd(0):setpd(1)}} >Products</th>
                                                
                                                <th>Amount</th>
                                                <th>Order Date</th>
                                                <th>Select</th>
                                            
                                            </tr>
                                        </thead>      
                            <tbody>
                            {allorders&&allorders.map((order, index) => {
                                return(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.phonenumber}</td>
                                    <td>{order.address.address}</td>
                                    <td>{order.id}</td>
                                    <td>{order.products.length}
                                    <table className={pd===1?'dis':'hide'}>
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Price</td>
                                                <td>Quantity</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.products.map((ep)=>{
                                                return(
                                                    <tr>
                                                    <td>{ep.name}</td>
                                                    <td>{ep.price}</td>
                                                    <td>{ep.quantity}</td>
                                                    </tr>
                                                    )
                                                })
                                                }
                                        </tbody>
                                    </table>
                                    
                                    
                                    </td>
                                    
                                    <td>Rs.{order.amount}</td>
                                    <td>{order.ordered_at}</td>
                                    <td><button className='form-control btn btn-primary mt-0' onClick={()=>{handleselect(order.id)}}>Select</button></td>

                                    </tr>
                                    )
                                
                            })}
                                </tbody>
                        </table>
                            
                    </div><div id="div8" className={( s!==0 && s!==2 &&s===1 )?'dis':'hide'}>
                            <div className="pt-5">  
                                    <div className="global-container  main">  
                                        <div className="card login-form">  
                                            <div className="card-body">  
                                                    <h3 className="card-title text-center"> <b>Edit Profile</b>  </h3>  
                                                    <div className="card-text">  
                                                        <form className="form m-1" >  
                                                            
                                                                
                                                                <input type="text" name="name" value={editprofile.name} placeholder="Name"className="form-control form-control-sm mt-3" autoComplete='new-password'  required  onChange={(e)=>seteditprofile({...editprofile,name:e.target.value})}/>  
                                                            
                                                                
                                                                
                                                                <input type="email" name="email" value={editprofile.email} placeholder="Email" className="form-control form-control-sm mt-3" autoComplete='new-password' onChange={(e)=>seteditprofile({...editprofile,email:e.target.value})}  required />  
                                                                
                                                                
                                                                
                                                                <input type="number" value={editprofile.phonenumber}  placeholder="Phone Number" className="form-control form-control-sm mt-3" autoComplete='new-password'   required  onChange={(e)=>seteditprofile({...editprofile,phonenumber:e.target.value})}/>
                                                               
                                                                
                                                            <button type="submit" className="btn btn-primary btn-block" onClick={handleupdateprofile}> UPDATE</button>  
                                                            
                                                        </form>  
                                                    </div>  
                                                </div>  
                                        </div>  
                                </div>
                            </div> 
                    
                    </div>
                    <div className={(s===2 && s!==0 && s!==1)?'dis':'hide'}>
                        <table className='table table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2 w-100'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Customer Name</th>
                                                <th>Phone Number</th>
                                                <th>Address</th>
                                                <th>Order ID</th>
                                                <th onClick={()=>{pds===1?setpds(0):setpds(1)}} >Products</th>
                                                <th>Amount</th>
                                                <th>Order Date</th>
                                                {/* <th>Deselect</th> */}
                                                
                                            
                                            </tr>
                                        </thead>      
                            <tbody>
                            {selectedorders&&selectedorders.map((order, index) => {
                                return(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.phonenumber}</td>
                                    <td>{order.address.address}</td>
                                    <td>{order.id}</td>
                                    <td >{order.products.length}
                                    <table className={pds===1?'dis':'hide'}>
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Price</td>
                                                <td>Quantity</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.products.map((ep)=>{
                                                return(
                                                    <tr>
                                                    <td>{ep.name}</td>
                                                    <td>{ep.price}</td>
                                                    <td>{ep.quantity}</td>
                                                    </tr>
                                                    )
                                                })
                                                }
                                        </tbody>
                                    </table>
                                    
                                    
                                    </td>
                                    <td>Rs.{order.amount}</td>
                                    <td>{order.ordered_at}</td>
                                    {/* <td><button className='form-control btn btn-primary mt-0' onClick={()=>{handledeselect(order.id)}}>Deselect</button></td> */}

                                    </tr>
                                    )
                                
                            })}
                                </tbody>
                        </table>
                        <button className='btn btn-info' onClick={()=>{handlecreateroute()}}>CreateRoute</button><button className='btn btn-info ml-4' onClick={()=>{handleshowroute()}}>ShowRoute</button>


                        <div className={rt===1?'dis':'hide'}>
                        <table className='table table-striped table-light table-hover table-responsive table-sortable mt-5 container border py-2 w-100'>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Customer Name</th>
                                                <th>Phone Number</th>
                                                <th>Address</th>
                                                <th>Order ID</th>
                                                <th onClick={()=>{pdst===1?setpdst(0):setpdst(1)}} >Products</th>
                                                <th>Amount</th>
                                                <th>Order Date</th>
                                                <th>Distance in KM</th>
                                                <th colSpan='2'>Action</th>
                                                
                                            
                                            </tr>
                                        </thead>      
                            <tbody>
                            {routes&&routes.map((order, index) => {
                                return(
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{order.customer}</td>
                                    <td>{order.phonenumber}</td>
                                    <td>{order.route.address}</td>
                                    <td>{order.id}</td>
                                    <td>{order.products.length}
                                    <table className={pdst===1?'dis':'hide'}>
                                        <thead>
                                            <tr>
                                                <td>Name</td>
                                                <td>Price</td>
                                                <td>Quantity</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.products.map((ep)=>{
                                                return(
                                                    <tr>
                                                    <td>{ep.name}</td>
                                                    <td>{ep.price}</td>
                                                    <td>{ep.quantity}</td>
                                                    </tr>
                                                    )
                                                })
                                                }
                                        </tbody>
                                    </table>
                                    
                                    
                                    </td>
                                    <td>Rs.{order.amount}</td>
                                    <td>{order.ordered_at}</td>
                                    <td>{order.route.distance}</td>
                                    <td className='d-flex'><button className={order.route.flag===true?'dis btn btn-primary':'hide'} onClick={()=>{handledeliver(order,routes[index+1],index,routes.length-1)}}>Deliver</button>
                                    <button className={order.route.flag===true?'dis btn btn-danger ml-2':'hide'} onClick={()=>{handlecancel(order,routes[index+1],index,routes.length-1)}}>Cancel</button></td> 
                                    </tr>
                                    )
                                
                            })}
                                </tbody>
                        </table>
                       
                            
                    </div>
                        
                    </div>
                    
                        

                </div>
        </div>
    </div>
       
    )
}
 
export default Dashboard