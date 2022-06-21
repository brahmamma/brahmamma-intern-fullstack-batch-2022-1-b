
import React,{useEffect,useState,useRef} from 'react';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import student1 from '../../student1.png'
import admin from '../../admin.png'
import { getallorders,selection,getselectedorders,getroutes,setroute} from '../../store/driverSlice';
function Dashboard(){
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    const u=JSON.parse(localStorage.getItem('user')) 
    var [s,sets]=React.useState(0)
    const [pd,setpd]=useState(0)
    const [rt,setrt]=useState(0)
    const dispatch=useDispatch();
    const allorders=useSelector((state)=>state.driver.allorders[0])
    const selectedorders=useSelector((state)=>state.driver.selectedorders[0])
    const routes=useSelector((state)=>state.driver.routes[0])

    function handleallorders(){
        sets(0)
    }
    function handleselectedorders(){
        sets(1)
    }
    function handleroutedis(){
        if(rt===0){
            setrt(1)
        }
        else{
            setrt(0)
        }

    }
    useEffect(()=>{
        dispatch(getallorders())
        dispatch(getselectedorders())
        dispatch(getroutes())

    },[dispatch])
    console.log(routes)

    function  handleselect(id){
        
        dispatch(selection(id))
        dispatch(setroute())
        sets(1)
       
    }

    return (
    <div className='d-flex flex-column'>
        <div className='row row-offcanvas row-offcanvas-left'>
            
                <div className="col-md-3 col-sm-12 col-lg-2 sidebar-offcanvas pl-0 side sticky-top " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                    <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                        <center>
                        <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" href="#"><h5><b>{u.name.toUpperCase()}</b></h5></a></li>
                        <li><img src={student1} className="imagestyle"/></li>
                        <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5><b></b></h5></a></li>
                        <li className={s===0?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"} onClick={handleallorders}><a className="nav-link text-secondary" ><h5>All Orders</h5></a></li>
                        <li className={s===1?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"} onClick={handleselectedorders}><a className="nav-link text-secondary"><h5>Selected Orders</h5></a></li>
                        
                        </center>
                        
                    </ul>
            </div>
            <div className='col-md-9 col-sm-12 pt-5 mt-3'>
            <div className={(s===0 && s!==1 )?'dis':'hide'}>
        <Container className='p-4'>
         
                
                <Row> 
            {allorders&&allorders.map((order,ui) => (   
            <Card key={ui}  style={{width:"30%"}}  className="m-2 car">  
                <Card.Header><b><center>order {ui+1}</center></b></Card.Header>  
                <Card.Body>
                <Card.Text>
                <span onClick={()=>{pd===1?setpd(0):setpd(1)}}>products:<b>{order.products.length}</b></span>
                <div className={pd===1?'dis':'hide'}>
                   <ol>
                    {
                        order.products.map((ep)=>{
                            return(
                                <li>name:<b>{ep.name}</b><br/>
                                price:<b>{ep.price}</b>
                                <br/>
                                quantity:<b>{ep.quantity}</b></li>
                            )

                        })
                    }
                   </ol>

                </div>
                <br/>
                Ordered By:<b>{order.customer}</b>
                <br/>
                Order Amount:<b> Rs.{order.amount}</b>
                <br/>
                Ordered on:<b>{order.ordered_at}</b>
                <br/>
                Address:<b>{order.address.address}</b>
                <br/>
                phonenumber:<b>{order.phonenumber}</b>
                <br/>
                
                <center><Button className='bg-primary buttonsytle' onClick={()=>{handleselect(order.id)}}>Select</Button></center>
               
                </Card.Text> 
                  
                </Card.Body>  
            </Card>  
            ))}
            
            </Row> 
            <br/> 
            </Container>  
            
        </div>


        <div className={(s===1 && s!==0 )?'dis':'hide'}>
        <Container className='p-4'>
         
                
                <Row> 
            {selectedorders&&selectedorders.map((order,ui) => (   
            <Card key={ui}  style={{width:"30%"}}  className="m-2 car">  
                <Card.Header><b><center>order {ui+1}</center></b></Card.Header>  
                <Card.Body>
                <Card.Text>
                <span onClick={()=>{pd===1?setpd(0):setpd(1)}}>products:<b>{order.products.length}</b></span>
                <div className={pd===1?'dis':'hide'}>
                   <ol>
                    {
                        order.products.map((ep)=>{
                            return(
                                <li>name:<b>{ep.name}</b><br/>
                                price:<b>{ep.price}</b>
                                <br/>
                                quantity:<b>{ep.quantity}</b></li>
                            )

                        })
                    }
                   </ol>

                </div>
                <br/>
                Ordered By:<b>{order.customer}</b>
                <br/>
                Order Amount:<b> Rs.{order.amount}</b>
                <br/>
                Ordered on:<b>{order.ordered_at}</b>
                <br/>
              
                Address:<b>{order.address.address}</b>
                <br/>
                phonenumber:<b>{order.phonenumber}</b>
                <br/>
                
                <center><Button className='bg-info buttonsytle' onClick={()=>{handleselect(order.id)}}>Delivered</Button>
                <Button className='bg-danger buttonsytle' onClick={()=>{handleselect(order.id)}}>Cancel</Button></center>
               
                </Card.Text> 
                  
                </Card.Body>  
            </Card>  
            ))}
            </Row> 
            <br/> 
            </Container> 
            
            <button  onClick={()=>{handleroutedis()}}>Route</button>
            <div className={rt===1?'dis':'hide'}>
                    {routes&&routes.map((route)=>{
                        return(
                            <span>{route.address}</span>
                        )
                    })}
            </div>
        
        
        </div>
            
              
            </div>   
        </div>
    </div>
       
    )
}
 
export default Dashboard