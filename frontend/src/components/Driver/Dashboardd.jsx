
import React from 'react';
import { useState ,useEffect} from 'react'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';   
 
const Dashboard = () => {
   
   const[allcourses,setallcourses] = useState([])
   const[dummyregisters,setdummyregisters] = useState([])
   const[dummycourseregisters,setdummycourseregisters] = useState([])
 
   




   
   
   var [s,sets]=React.useState(0)
   function handleallcourse(){
       sets(0)
   }
    function handleaddcourse(){
       
        sets(1)
        
        
    }
    function handleregisterapprove(){
        
        sets(2)
        
        
    }
    function handlecourseapprove(){
        
        sets(3)
        
    }
    function handlefeeapprove(){
        
        sets(4)
        
    }
    
 
    return (
    <div className="col main pt-5 mt-3">
         
        <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2" onClick={handleallcourse}>
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-primary" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 className="text-uppercase">All products</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handleaddcourse}>
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 classname="text-uppercase">ADD product</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handleregisterapprove}>
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        
                        <h6 className="text-uppercase" >ALL CATEGORIES</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlecourseapprove}>
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        
                        <h6 className="text-uppercase">ADD CATEGORY</h6>
                        
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlefeeapprove}>
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        
                        <h6 className="text-uppercase">ALL DRIVERS</h6>
                        
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlecourseapprove}>
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        
                        <h6 className="text-uppercase">ADD DRIVER</h6>
                        
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlecourseapprove}>
                <div className="card text-white bg-secondy h-100">
                    <div className="card-body bg-secondary">
                        
                        <h6 className="text-uppercase"> ALL ORDERS</h6>
                        
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlecourseapprove}>
                <div className="card text-white bg-success h-100">
                    <div className="card-body bg-success">
                        
                        <h6 className="text-uppercase">ALL USERS</h6>
                        
                    </div>
                </div>
            </div>
        </div>

        
 
    </div>
    )
}
 
export default Dashboard