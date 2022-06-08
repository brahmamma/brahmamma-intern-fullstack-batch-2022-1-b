
import React from 'react';
import { useState ,useEffect} from 'react';
import student1 from '../../student1.png'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'; 
import {useFormik} from 'formik';
import {getallproducts,getallcategories,getalladdresses,getallcartitems,getallorders,addtocart,removefromcart,incquan,decquan,addaddress} from '../../store/userSlice';
 
function Dashboard(){
    const dispatch = useDispatch();
   const allproducts=useSelector(state=>state.user.allproducts[0]);
   const allcategories=useSelector(state=>state.user.allcategories[0]);
    const allorders=useSelector(state=>state.user.allorders[0]);
    const allcartitems=useSelector(state=>state.user.allcartitems[0]);
    const alladdresses=useSelector(state=>state.user.alladdresses[0]);
   const [productsearch,setproductsearch]=useState('')
   const [catfilter,setcatfilter]=useState(null)
   const [as,setas]=useState(0)
 
   useEffect(()=>{
    dispatch(getallproducts());
    dispatch(getallcategories());
    dispatch(getallorders());
    dispatch(getallcartitems());
    dispatch(getalladdresses())
   },[dispatch])
  
   var [s,sets]=React.useState(0)

   const [newaddr,setaddr]=useState({
       hno:'',
       village:'',
       mandal:'',
       district:'',
       state:'',
       pincode:null
   })





   
   function handleallproducts(){
       sets(0)
   }
    function handleallcategories(){
       
        sets(1)
        
        
    }
    function handlecart(){
        
        sets(2)
        
        
    }
    function handleorders(){
        
        sets(3)
        
    }
    function handleaddcart(id){
        sets(2)
        dispatch(addtocart(id))
    }
    function handleremove(id){
        dispatch(removefromcart(id))
    }
    function handleincquan(id){
        dispatch(incquan(id))
    }
    function handledecquan(id){
        dispatch(decquan(id))
    }
    function handlebuy(product){
        sets(4)
    }
    function handleas(){
        if(as===0){
            setas(1)
        }
        else{
            setas(0)
        }
    }
    function addressadding(){
        dispatch(addaddress(newaddr))
        sets(4)
        

    }
    return (
    <div className="col main pt-5 mt-3">
         
        <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2" onClick={handleallproducts}>
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-primary" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 className="text-uppercase">All products</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handleallcategories}>
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        
                        <h6 classname="text-uppercase">ALL CATEGORIES</h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handlecart}>
                <div className="card text-white bg-danger h-100">
                    <div className="card-body bg-danger">
                        
                        <h6 className="text-uppercase" >CART<span className='spanstyle'></span></h6>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2" onClick={handleorders}>
                <div className="card text-white bg-info h-100">
                    <div className="card-body bg-info">
                        
                        <h6 className="text-uppercase">ORDERS</h6>
                        
                    </div>
                </div>
            </div>
            
            
        </div>
        <div className={(s===0 && s!==1 && s!==2 && s!==3)?'dis':'hide'}>
            <input type="text" value={productsearch} placeholder="search..." onChange={(e)=>setproductsearch(e.target.value)}/>
            <Container className='p-4'>  
                <Row>  
                
            { allproducts&& allproducts.filter(product=>product.name.toLowerCase().includes(productsearch.toLowerCase())).map((product,ui) => (  
            <Card
                
                key={ui}  
                 
                style={{width:"23%"}}  
                className="m-2 car"  
            >  
                <Card.Header><b><center>{product.name}</center></b></Card.Header>  
                <Card.Body>
                <center>
                <Card.Text>
                <img src={student1} className="productimage"/>
                <b>{product.price}</b>
                <br/>
                <b>{product.description}</b>
                <br/>
                <Button className='buttonstyle bg-warning' onClick={()=>handleaddcart(product.id)}>Add To Cart</Button>
                <Button className='bg-info'>Order</Button>
                <br/>
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
        </div>
        <div className={(s===1 && s!==2 && s!==0 && s!==3)?'dis':'hide'}>
            
            <Container className='p-4'>  
                <Row> 
                <select className='form-control form-control-sm mt-3 selectstyle' onChange={(e)=>{setcatfilter(parseInt(e.target.value))}}>
                    <option className='form-control form-control-sm mt-3'>Select category</option>
                    {allcategories&&allcategories.map((cat)=>{
                        return(
                            <option className='form-control form-control-sm mt-3' value={cat.id}>{cat.category}</option>
                        )
                    })}
                </select> 
                
            { allproducts&& allproducts.filter(pro=>pro.category_id==catfilter).map((product,ui) => (  
            <Card
                
                key={ui}  
                 
                style={{width:"23%"}}  
                className="m-2 car"  
            >  
                <Card.Header><b><center>{product.name}</center></b></Card.Header>  
                <Card.Body>
                <center>
                <Card.Text>
                <img src={student1} className="productimage"/>
                <b>{product.price}</b>
                <br/>
                <b>{product.description}</b>
                <br/>
                <Button className='buttonstyle bg-warning' onClick={()=>handleaddcart(product.id)} >Add To Cart</Button>
                <Button className='bg-info'>Order</Button>
                
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
        </div>
        <div className={(s===2 && s!==1 && s!==0 && s!==3)?'dis':'hide'}>
        <Container className='p-4'>  
                <Row>  
                
            { allcartitems&& allcartitems.map((ci,ui) => (   
            <Card key={ui}  style={{width:"23%"}}  className="m-2 car">  
                <Card.Header><b><center>{ci.product.name}</center></b></Card.Header>  
                <Card.Body>
                <center>
                <Card.Text>
                <img src={student1} className="productimage"/>
                price:<b>{ci.product.price}</b>
                <br/>
                <br/>
                <span className='buttonstyle'>quantity</span>
                <button className='buttonstyle' onClick={()=>handledecquan(ci.id)}>-</button>
                {ci.quantity}
                <button className='buttonstyle ml-2' onClick={()=>handleincquan(ci.id)}>+</button>
                <br/>
                <br/>
                payable:<b>{ci.product.price*ci.quantity}</b>
                <br/>
                <Button className='bg-info buttonstyle' onClick={()=>handlebuy(ci)}>Buy</Button>
                <Button className='bg-danger' onClick={()=>handleremove(ci.id)}>Remove</Button>
                <br/>
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}
            
            </Row> 
            <br/>
            <Button className='bg-warning'>Place Order</Button> 
            </Container>  
            
        </div>
        <div id="div8" className={(s===4 && s!==0 && s!==2 && s!==1 && s!==3)?'dis':'hide'}>
                <div className="pt-5">  
                        <div className="global-container  main">  
                            <div className="card login-form">  
                                <div className="card-body">  
                                        <h3 className="card-title text-center"> <b>Choose Address</b>  </h3>  
                                        <div className="card-text">  
                                            <form  className="form m-1" >  
                                                {alladdresses&&alladdresses.map((address,ai)=>{
                                                    return(
                                                        <div className="form-group">
                                                            <input type='radio' value={address.id}/> {address.hno} {address.village}{address.mandal} {address.District}{address.state} {address.pincode} 
    
                                                        </div>  
                                                    )
                                                })}
                                                
                                                
                                            </form>
                                            <button className='btn btn-primary butt' onClick={()=>{handleas()}}>Add Address</button>
                                                <br/>
                                                <br/>
                                                <div className={as===1?'dis':'hide'}>
                                                    <form className="form m-1" >
                                                        <input type="text" name="hno" placeholder="House Number" className='form-control form-control-sm mt-3'required onChange={(e)=>setaddr({...newaddr,hno:e.target.value})}/>
                                                        <input type="text" name="village" placeholder="Village" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,village:e.target.value})}/>
                                                        <input type="text" name="mandal" placeholder="Mandal" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,mandal:e.target.value})}/>
                                                        <input type="text" name="district" placeholder="District" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,district:e.target.value})}/>
                                                        <input type="text" name="state" placeholder="State" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,state:e.target.value})}/>
                                                        <input type="number" name="pincode" placeholder="Pincode" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,pincode:e.target.value})}/>

                                                        <button className='btn btn-primary' onClick={()=>{addressadding()}}>ADD</button>

                                                    </form>

                                                </div>    
                                        </div>  
                                    </div>  
                            </div>  
                    </div>
                </div> 
        
        </div>
    
    </div>
    
    )
}
 
export default Dashboard