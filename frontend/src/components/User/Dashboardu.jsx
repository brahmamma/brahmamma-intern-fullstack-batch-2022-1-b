
import React from 'react';
import { useState ,useEffect} from 'react';
import student1 from '../../student1.png'; 
import admin from '../../admin.png'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'; 
import {useFormik} from 'formik';
import {getallproducts,getallcategories,getalladdresses,getallcartitems,getallorders,addtocart,removefromcart,incquan,decquan,addaddress,placeorder,removefromorders} from '../../store/userSlice';
 
function Dashboard(){
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    const u=JSON.parse(localStorage.getItem('user'))
    function handlelogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.location.href='/'
    }
    const dispatch = useDispatch();
   
   const allproducts=useSelector(state=>state.user.allproducts[0]);
   const allcategories=useSelector(state=>state.user.allcategories[0]);
    const allorders=useSelector(state=>state.user.allorders[0]);
    const allcartitems=useSelector(state=>state.user.allcartitems[0]);
    const alladdresses=useSelector(state=>state.user.alladdresses[0]);
   const [productsearch,setproductsearch]=useState('')
   const [catfilter,setcatfilter]=useState(null)
   const [as,setas]=useState(0)
   /*let [totalamount,settotalamount]=useState(0)
   allcartitems.map((pro)=>{
    settotalamount(totalamount+(parseInt(pro.quantity)*parseInt(pro.product.price)))
  })*/
  const [ordering,setordering]=useState({})
   const [ordaddress,setordaddress]=useState({})
 
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
    function handleorder(product){
        
        const pro={
            id:product.id,
            quantity:1

        }
        setordering(pro)
        sets(4)
    }
    
    function handleplaceorder(prod,add){
        dispatch(placeorder(prod,add))
        sets(3)

    }
    function handlecancel(id){
        
        dispatch(removefromorders(id))
        sets(3)
    }
    function handlebuy(product){
        const pro={
            id:product.product.id,
            quantity:product.quantity
        }
        handleremove(pro.id)
        setordering(pro)
        sets(4)
        
    }

    return (
        <div className='d-flex flex-column'>
            <div className='row row-offcanvas row-offcanvas-left'>
            <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                        <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                            <center>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary"><h5><b>{u.name.toUpperCase()}</b></h5></a></li>
                            <li><img src={admin} className="imagestyle"/></li>
                            <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" onClick={handleallproducts}><h5>All products</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" onClick={handleallcategories}><h5>All Categories</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" onClick={handlecart}><h5>Cart</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a class="nav-link text-secondary" onClick={handleorders}><h5>Orders</h5></a></li>
                            
                            <li className="nav-item mb-2 "><span onClick={handlelogout} >Logout</span></li>
                            </center>
                            
                        </ul>
                </div>
    <div className="col pt-5 mt-3">
        <div className={(s===0 && s!==1 && s!==2 && s!==3)?'dis':'hide'}>
            <input type="text" className='form-control form-control-sm' value={productsearch} placeholder="search..." onChange={(e)=>setproductsearch(e.target.value)}/>
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
                <Button className='bg-info'onClick={()=>{handleorder(product)}}>Order</Button>
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
                
            { allproducts&& allproducts.filter(pro=>pro.category_id===catfilter).map((product,ui) => (  
            <Card
                
                key={ui}  
                 
                style={{width:"23%"}}  
                className="m-2 car"  
            >  
                <Card.Header><b><center>{product.name}</center></b></Card.Header>  
                <Card.Body>
                <center>
                <Card.Text>
                <img src={student1} className="productimage" />
                <b>{product.price}</b>
                <br/>
                <b>{product.description}</b>
                <br/>
                <Button className='buttonstyle bg-warning' onClick={()=>handleaddcart(product.id)} >Add To Cart</Button>
                <Button className='bg-info' onClick={()=>handleorder(product)}>Order</Button>
                
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
        <div className={(s===3 && s!==1 && s!==0 && s!==4)?'dis':'hide'}>
        <Container className='p-4'>  
                <Row>  
                
            { allorders&& allorders.map((order,ui) => (   
            <Card key={ui}  style={{width:"30%"}}  className="m-2 car">  
                <Card.Header><b><center>{order.product.name}</center></b></Card.Header>  
                <Card.Body>
                <Card.Text>
                <img src={student1} className="productimage"/>
                <br/>
                Price:{order.product.price}
                <br/>
                Quantity:{order.quantity}
                <br/>
                Amount:<b>{order.product.price*order.quantity}</b>
                <br/>
                Method:<b>Cash on  Delivery</b>
                <br/>
                Address:<b>{order.address.hno} {order.address.village} {order.address.mandal} {order.address.mandal} {order.address.district} {order.address.district} {order.address.state}</b>
                <br/>
                pincode:<b>{order.address.pincode}</b>
                <br/>
                Ordered on:<b>{order.ordered_at}</b>
                <br/>
                Expected by:<b>{order.delivery_date}</b>
                <br/>
                <Button className='bg-danger' onClick={()=>handlecancel(order.id)} >Cancel</Button>
                <br/>
                </Card.Text> 
                  
                </Card.Body>  
            </Card>  
            ))}
            
            </Row> 
            <br/> 
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
                                                            <input type='radio' name="radio-btn" id={ai} value={address.id} onClick={()=>setordaddress(address)}/>{address.hno} {address.village} {address.mandal} {address.District}{address.state} {address.pincode} 
    
                                                        </div>  
                                                    )
                                                })}
                                                
                                                
                                            </form>
                                            <button className='btn btn-primary butt' onClick={()=>{handleas()}}>Add Address</button>
                                                <br/>
                                                <br/>
                                                <div className={as===1?'dis':'hide'}>
                                                    <form className="form m-1" >
                                                        <input type="text" name="hno" placeholder="House Number" className='form-control form-control-sm mt-3'required onChange={(e)=>setaddr({...newaddr,hno:e.target.value})} autoComplete='new-password'/>
                                                        <input type="text" name="village" placeholder="Village" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,village:e.target.value})} autoComplete='new-password'/>
                                                        <input type="text" name="mandal" placeholder="Mandal" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,mandal:e.target.value})} autoComplete='new-password'/>
                                                        <input type="text" name="district" placeholder="District" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,district:e.target.value})} autoComplete='new-password'/>
                                                        <input type="text" name="state" placeholder="State" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,state:e.target.value})} autoComplete='new-password'/>
                                                        <input type="number" name="pincode" placeholder="Pincode" className='form-control form-control-sm mt-3' required onChange={(e)=>setaddr({...newaddr,pincode:e.target.value})}/>

                                                        <button className='btn btn-primary' onClick={()=>{addressadding()}}>ADD</button>

                                                    </form>

                                                </div> 
                                                <button className='btn btn-info butt' onClick={()=>{handleplaceorder(ordering,ordaddress)}}>Placeorder</button>  
                                        </div>  
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