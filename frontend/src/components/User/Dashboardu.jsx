
import React from 'react';
import { useState ,useEffect} from 'react';
import student1 from '../../student1.png'; 
import admin from '../../admin.png';
import {Dropdown} from 'react-bootstrap';
import walstore from '../../walstore.png'; 
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'; 
import GooglePlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-google-places-autocomplete';

import {getallproducts,getallcategories,getalladdresses,getallcartitems,getallorders,addtocart,removefromcart,incquan,decquan,placeorder,removefromorders,placeallorders,addaddresss,removeaddress,updateprofile} from '../../store/userSlice';
 
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
    const [addaddress, setaddaddress] = React.useState(null);
    const [latlng, setLatlng] = React.useState(null);
    const dispatch = useDispatch();
    const [ps,setps]=useState('')
   const allproducts=useSelector(state=>state.user.allproducts[0]);
   const allcategories=useSelector(state=>state.user.allcategories[0]);
    const allorders=useSelector(state=>state.user.allorders[0]);
    const allcartitems=useSelector(state=>state.user.allcartitems[0]);
    const alladdresses=useSelector(state=>state.user.alladdresses[0]);
   const [productsearch,setproductsearch]=useState('')
   const [catfilter,setcatfilter]=useState(null)
   const [editprofile,seteditprofile]=useState({})
   const [as,setas]=useState(0)
   const [mo,setmo]=useState(0)
   const [pd,setpd]=useState(0)
   const [po,setpo]=useState(0)
   
  const [ordering,setordering]=useState({})
   const [ordaddress,setordaddress]=useState({})
    const [filterkey,setfilterkey]=useState('')
   useEffect(()=>{
    dispatch(getallproducts());
    dispatch(getallcategories());
    dispatch(getallorders());
    dispatch(getallcartitems());
    dispatch(getalladdresses())
   },[dispatch])
  
   var [s,sets]=React.useState(0)

   

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
        const np={
            address:addaddress,
            lanlat:latlng
        }
        setaddaddress(' ')
       dispatch(addaddresss(np))
        sets(4)
        
    }
    function handleorder(product){
        setmo(0)
        const pro={
            id:product.id,
            price:product.price,
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
        setmo(0)
        const pro={
            id:product.product.id,
            quantity:product.quantity
        }
        handleremove(pro.id)
        setordering(pro)
        sets(4)
        
    }
    function handlecartorders(){
        setmo(1)
        sets(4)



    }
    function handleplaceallorder(add){
        setmo(0)
        dispatch(placeallorders(allcartitems,add))
        dispatch(getallcartitems());
        sets(3)
        
    }
    function handledeladdress(id){
        dispatch(removeaddress(id))
        sets(4)
    }
    function handleeditprofile(u){
        seteditprofile(u)
        sets(5)

    }
    function handleupdateprofile(){
        dispatch(updateprofile(editprofile))

    }
    
    function handleaddaddress(addaddress){{

        
        setaddaddress(addaddress.label);
        geocodeByAddress(addaddress.label)
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLatlng(JSON.stringify({ lat, lng }));
            });
        

    }}
    return (
        <div className='d-flex flex-column'>
            <div className='row row-offcanvas row-offcanvas-left'>
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
            <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side sticky-top " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                        <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                            <center>
                           
                            <li><img src={admin} className="imagestyle mb-2 mt-5"/></li>
                            <li className={s===0?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"}><a className="nav-link text-secondary" onClick={handleallproducts}><h5>ALL PRODUCTS</h5></a></li>
                            <li className={s===1?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"}><a className="nav-link text-secondary" onClick={handleallcategories}><h5>ALL CATEGORIES</h5></a></li>
                            <li className={s===2?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"}><a className="nav-link text-secondary" onClick={handlecart}><h5>🛒 CART</h5></a></li>
                            <li className={s===3?"nav-item mb-2 mt-3 bghighlight":"nav-item mb-2 mt-3"}><a className="nav-link text-secondary" onClick={handleorders}><h5>🗲ORDERS</h5></a></li>
                            
                            
                            </center>
                            
                        </ul>
                </div>
    <div className="col pt-5 mt-3">
        <div className={(s===0 && s!==1 && s!==2 && s!==3 && s!==4 && s!==5)?'dis':'hide'}>
            <input type="text" className='form-control form-control-sm mt-4 mb-2' value={productsearch} placeholder="🔍 Search..." onChange={(e)=>setproductsearch(e.target.value)}/>
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
                <img src={product.image} className="productimage"/>
                <b>₹{product.price}</b>
                <br/>
                <b>{product.description}</b>
                <br/>
                <Button className='buttonstyle bg-warning' onClick={()=>handleaddcart(product.id)}>🛒ADD CART</Button>
                <Button className='orderbtn'onClick={()=>{handleorder(product)}}>🗲ORDER</Button>
                <br/>
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
        </div>
        <div className={(s===1 && s!==2 && s!==0 && s!==3 && s!==4 && s!==5)?'dis':'hide'}>
            
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
                <img src={product.image} className="productimage" />
                <b>₹ {product.price}</b>
                <br/>
                <b>{product.description}</b>
                <br/>
                <Button className='buttonstyle bg-warning' onClick={()=>handleaddcart(product.id)}>🛒ADD CART</Button>
                <Button className='orderbtn' onClick={()=>handleorder(product)}>🗲ORDER</Button>
                
                </Card.Text> 
                </center>   
                </Card.Body>  
            </Card>  
            ))}  
            </Row>  
            </Container>  
        </div>
        <div className={(s===2 && s!==1 && s!==0 && s!==3 && s!==4 && s!==5)?'dis':'hide'}>
        <input type="text" className='form-control form-control-sm mt-4 mb-3' value={ps} placeholder="🔍 Search..." onChange={(e)=>setps(e.target.value)}/>
        <Container className='p-4'>  
                <Row>  
                
            { allcartitems&& allcartitems.filter(ci=>ci.product.name.toLowerCase().includes(ps.toLocaleLowerCase())).map((ci,ui) => (   
            <Card key={ui}  style={{width:"23%"}}  className="m-2 car">  
                <Card.Header><b><center>{ci.product.name}</center></b></Card.Header>  
                <Card.Body>
                <center>
                <Card.Text>
                <img src={ci.product.image} className="productimage"/>
                price:<b> ₹ {ci.product.price}</b>
                <br/>
                <br/>
                <span>quantity:</span>
                <button className='mr-2 ml-2 quanbtn'  onClick={()=>handledecquan(ci.id)}>-</button>
                <span className='quan'><b>{ci.quantity}</b></span>
                <button className='mr-2 ml-2 quanbtn' onClick={()=>handleincquan(ci.id)}>+</button>
                <br/>
                <br/>
                payable:<b> ₹ {ci.product.price*ci.quantity}</b>
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
            
            <Button className={allcartitems&&allcartitems.length>0?'dis placebutton':'hide'} onClick={handlecartorders}>🗲PLACE ORDER</Button> 
            </Container>  
            
        </div>
        <div className={(s===3 && s!==1 && s!==0 && s!==4 && s!==2 && s!==5)?'dis':'hide'}>
        <Container className='p-4'> 
        <input type="text" className='form-control form-control-sm mb-3' value={filterkey} onChange={(e)=>setfilterkey(e.target.value)} placeholder="🔍 Search...."/>
                <Row>  
                
            { allorders&& allorders.filter(order=>order.order_status.toLowerCase().includes(filterkey.toLowerCase())).map((order,ui) => (   
            <Card key={ui}  style={{width:"30%"}}  className="m-2 car">  
                <Card.Header className={order.order_status==='Accepted'?'text-light bg-success':(order.order_status==='Cancelled'?'bg-danger text-light':(order.order_status==='Pending'?'text-light bg-info':(order.order_status==='Delivered'?'text-light bg-primary':'text-light bg-warning')))}><b><center>{order.order_status}</center></b></Card.Header>  
                <Card.Body>
                <Card.Text>
                <span onClick={()=>{pd===1?setpd(0):setpd(1)}}>products:<b>{order.products.length}</b></span>
                <div className={pd===1?'dis':'hide'}>
                   <ol>
                    {
                        order.products.map((ep)=>{
                            return(
                                <li>name:<b>{ep.name}</b><br/>
                                price:<b>₹ {ep.price}</b>
                                <br/>
                                quantity:<b>{ep.quantity}</b></li>
                            )

                        })
                    }
                   </ol>

                </div>
                <br/>
                payement mode:<b>COD</b>
                <br/>
                Order Amount:<b>₹ {order.amount}</b>
                <br/>
                Ordered on:<b>{order.ordered_at}</b>
                <br/>
                Delivery Expected by:<b>{order.delivery_date}</b>
                <br/>
                address:<b>{order.address.address}</b>
                <br/>
                phonenumber:<b>{order.phonenumber}</b>
                <br/>
                <Button className='bg-danger' onClick={()=>handlecancel(order.id)} >CANCEL</Button>
                <br/>

                <div className={order.order_status==='Out for Delivery'?'dis':'hide'}>
                    Picked By:<b>{order.drivername}</b>
                    
               </div>
               <div className={order.order_status==='Delivered'?'dis':'hide'}>
                    Delivered By:<b>{order.drivername}</b>
               </div>
                </Card.Text> 
                  
                </Card.Body>  
            </Card>  
            ))}
            
            </Row> 
            <br/> 
            </Container>  
            
        </div>
        <div id="div8" className={(s===4 && s!==0 && s!==2 && s!==1 && s!==3 && s!==5 )?'dis':'hide'}>
                <div className="pt-5">  
                        <div className="global-container  main">  
                            <div className="card login-form">  
                                <div className="card-body">  
                                        <h3 className="card-title text-center"> <b>Choose Address</b>  </h3>  
                                        <div className="card-text">  
                                            
                                                {alladdresses&&alladdresses.map((address,ai)=>{
                                                    return(
                                                        <div className='form-group'>
                                                            <input type='radio' name="radio-btn"  id={ai} value={address.id} onClick={()=>(setpo(1),setordaddress(address),setas(0))}/><span  className='addressfield' >{address.address}</span>{' '}<i onClick={()=>{{handledeladdress(address.id)}}}>❌</i>
                                                        </div> 
                                                    )
                                                })}
                                                
                                                
                                           
                                            <button className='btn btn-primary butt' onClick={()=>{handleas()}}>Add Address</button>
                                                <br/>
                                                <br/>
                                                <div className={as===1?'dis':'hide'} >
                                                    <form className="form m-1" >
                                                        
                                                        <GooglePlacesAutocomplete 
                                                            apiKey={process.env.React_App_GPACAPIKEY}
                                                            className='form-control form-control-lg'
                                                            selectProps={{
                                                            addaddress,
                                                            onChange:handleaddaddress,
                                                            }}
                                                            value={addaddress}
                                                        />   
                                                       
                                                        
                                                        
                                                    </form>
                                                    <button className='btn btn-primary' onClick={()=>{addressadding()}}>ADD</button>

                                                </div>
                                                <br/> 
                                                <center><button className={po===1?'btn  butt dis placebtn':'hide'} onClick={mo===1?()=>{handleplaceallorder(ordaddress)}:()=>{handleplaceorder(ordering,ordaddress)}}>🗲PLACE ORDER</button></center> 
                                                 
                                        </div>  
                                    </div>  
                            </div>  
                    </div>
                </div> 
        
        </div>
        <div id="div8" className={(s===5 && s!==0 && s!==2 && s!==3 && s!==4)?'dis':'hide'}>
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
    
    </div>
    </div>
    </div>
    )
}
 
export default Dashboard