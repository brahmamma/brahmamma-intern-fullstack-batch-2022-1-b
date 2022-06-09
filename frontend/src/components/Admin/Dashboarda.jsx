
import React,{useEffect,useState,useRef} from 'react';
import {Container ,Card,Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'; 
import { useFormik } from 'formik';
import * as yup from 'yup';
import student1 from '../../student1.png'
import admin from '../../admin.png'
 import { getalldrivers,getallusers,getallproducts,getallcategories,addcategory,adddriver,addproduct,makeitavailable,makeitunavailable,updatingproduct,deletion} from '../../store/adminSlice';
 import { getData,registeruser } from '../../store/authenticSlice'
function Dashboard(){
    const loggeduser=useSelector(state=>state.authentic.loggeduser);
    const u=JSON.parse(localStorage.getItem('user'))
    function handlelogout(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.location.href='/'
    }
    const [usersearch,setusersearch]=useState('')
    const [catfilter,setcatfilter]=useState(null)
    const [productsearch,setproductsearch]=useState('')
    const [driversearch,setdriversearch]=useState('')
    const [editpro,seteditpro]=useState({})
   const dispatch=useDispatch();
   const allproducts=useSelector((state)=>state.admin.allproducts[0])
   const allusers=useSelector((state)=>state.admin.allusers[0])
   const allcategories=useSelector((state)=>state.admin.allcategories[0])
   const alldrivers=useSelector((state)=>state.admin.alldrivers[0])
   const emails=[]
    const users = useSelector((state) => state.authentic.users);
    users.map((user)=>{
        emails.push(user.email)
    })

useEffect(()=>{
    dispatch(getallproducts());
    dispatch(getallusers());
    dispatch(getallcategories());
    dispatch(getalldrivers());
    dispatch(getData())
},[dispatch])

    var [s,sets]=React.useState(0)
   function handleallproducts(){
       sets(0)
   }
   
   
    function handleaddproduct(){
       
        sets(1)
        
        
    }
    function handleallcategories(){
        
        sets(2)
        
        
    }
    function handleaddcategory(){
        
        sets(3)
        
    }
    function handlealldrivers(){
        
        sets(4)
        
    }
    function handleadddriver(){
        
        sets(5)
        
    }
    function handleallorders(){
        
        sets(6)
        
    }
    function handleallusers(){
        
        sets(7)
        
    }
    function handleedit(pro){
        seteditpro(pro)
        sets(8)
    }
    function handleupdate(){
        dispatch(updatingproduct(editpro))
    }
    function handledelete(pro){
        dispatch(deletion(pro))
    }
    function handleavailability(pro){
        if(pro.available_status===true){
            dispatch(makeitunavailable(pro))
        }
        else{
            dispatch(makeitavailable(pro))

        }


    }

    const addproductvalidations=yup.object().shape({
        name:yup.string().required('please eneter the name').min(3,'too short..').max(35,'too long...'),
        price:yup.string().required('please ente the price').min(1,'Not valid phone number').max(15,'Not valid phone number'),
        image:yup.string().required('image is equired'),
        category_id:yup.string().required('please select the category'),
        description:yup.string().required('Please provide description')
         

    })
    const addproductformik=useFormik({
        initialValues:{
            name:'',
            category_id:'',
            price:'',
            image:'',
            description:''
            

        },
        validationSchema:addproductvalidations,
        
        onSubmit:(values)=>{
           
            const newproduct={
                name:values.name,
                image:values.image,
                price:values.price,
                category_id:parseInt(values.category_id),
                description:values.description,
                available_status:true
            }
            console.log(newproduct)
            dispatch(addproduct(newproduct))
            window.location.reload()
        }
        
    })
    
    const addcategoryvalidations=yup.object().shape({
        category:yup.string().required('please eneter the categoryname').min(3,'too short..').max(35,'too long...'),
        
         

    })

    
    const addcategoryformik=useFormik({
        initialValues:{
           
            category:'',
            
            

        },
        validationSchema:addcategoryvalidations,
        
        onSubmit:(values)=>{
            dispatch(addcategory(values))
            window.location.reload()
            
        }
        
    })
    const validations=yup.object().shape({
        username:yup.string().required('Username is required').min(3,'too short..').max(35,'too long...'),
        phonenumber:yup.string().required('phone number rrequired').min(10,'Not valid phone number').max(10,'Not valid phone number').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,'Not a valid phonne number'),
        password:yup.string().required('Password is required').min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special').max(30,'Maximum 30 charracters are allowed')
                    .minLowercase(1,'password must contain at least 1 lower case letter').minUppercase(1,'password must contain at least 1 upper case letter').minNumbers(1, 'password must contain at least 1 number')
                    .minSymbols(1, 'password must contain at least 1 special character'),
        confirmpassword:yup.string().required(' confirm Password is required').oneOf([yup.ref('password'),null],'password and confirm passwords should match..'),
        email:yup.string().required('email is required').email('Inavlid email format').notOneOf(emails,'Email already Taken!')     

    })

    const adddriverformik=useFormik({
        initialValues:{
            username:'',
            email:'',
            phonenumber:'',
            password:'',
            confirmpassword:''

        },
        validationSchema:validations,
        
        onSubmit:(values)=>{
           
            const newdriver={
                name:values.username,
                email:values.email,
                phonenumber:values.phonenumber,
                password:values.password,
                role_id:2
            }
            console.log(newdriver)
            dispatch(adddriver(newdriver))
           window.location.reload();
        }
        
    })
 
    return (
    <div  className='d-flex flex-column'>
        <div className='row row-offcanvas row-offcanvas-left'>
                <div className="col-md-3 col-lg-2 sidebar-offcanvas pl-0 side " id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
                        <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                            <center>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary"><h5><b>{u.name.toUpperCase()}</b></h5></a></li>
                            <li><img src={admin} className="imagestyle"/></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleallproducts}><h5>All products</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleaddproduct}><h5>Add Product</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleallcategories}><h5>All Categories</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleaddcategory}><h5>Add Category</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handlealldrivers}><h5>All Drivers</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleadddriver}><h5>Add Driver</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleallorders}><h5>All Orders</h5></a></li>
                            <li className="nav-item mb-2 mt-3"><a className="nav-link text-secondary" onClick={handleallusers}><h5>All Users</h5></a></li>
                            <li className="nav-item mb-2 "><span onClick={handlelogout} >Logout</span></li>
                            </center>
                            
                        </ul>
                </div>
                <div className="col  pt-5 mt-3">
                    
                    <div className={(s===0 && s!==1 && s!==2 && s!==3 && s!==4 && s!==5 &&s!==6 && s!==7)?'dis':'hide'}>
                        <input type="text" className='form-control form-control-sm' value={productsearch} placeholder="search..." onChange={(e)=>setproductsearch(e.target.value)}/>
                        <Container className='p-4'>  
                            <Row>  
                            
                        { allproducts&& allproducts.filter(product=>product.name.toLowerCase().includes(productsearch.toLocaleLowerCase())).map((product,ui) => (  
                        <Card
                            
                            key={ui}  
                            
                            style={{width:"23%"}}  
                            className="m-2 car"  
                        >  
                            <Card.Header><b><center>{product.name}</center></b></Card.Header>  
                            <Card.Body>
                            <center>
                            <Card.Text>
                            <img src={student1} className="productimage" alt="user"/>
                            <b>{product.price}</b>
                            <br/>
                            <b>{product.description}</b>
                            <br/>
                            <Button className='buttonstyle' onClick={()=>{handleedit(product)}}>EDIT</Button>
                            <Button onClick={()=>handledelete(product)}>DELETE</Button>
                            <br/>
                            <Button onClick={()=>{handleavailability(product)}}  className={product.available_status?"available":"unavailable"}>{product.available_status?"Make it Unavailable":"Make it Available"}</Button>
                            </Card.Text> 
                            </center>   
                            </Card.Body>  
                        </Card>  
                        ))}  
                        </Row>  
                        </Container>  
                </div>
                <div id="div1" className={(s===1 && s!==0 && s!==2 && s!==3 && s!==4 && s!==5 &&s!==6 && s!==7)?'dis':'hide'}>
                            <div className="pt-5">  
                                    <div className="global-container  main">  
                                        <div className="card login-form">  
                                            <div className="card-body">  
                                                    <h3 className="card-title text-center"> <b>Add Product</b>  </h3>  
                                                    <div className="card-text">  
                                                        <form onSubmit={addproductformik.handleSubmit} className="form m-1" >  
                                                            
                                                                
                                                                <input type="text"  placeholder="Name"className="form-control form-control-sm mt-3" autoComplete='new-password' {...addproductformik.getFieldProps('name')} required />  
                                                            
                                                                {addproductformik.touched.name&&addproductformik.errors.name?<div className='errors'>{addproductformik.errors.name}</div>:null}
                                                                
                                                                <input type="text"  placeholder="Image" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...addproductformik.getFieldProps('image')} required />  
                                                                {addproductformik.touched.image&&addproductformik.errors.image?<div className='errors'>{addproductformik.errors.image}</div>:null}
                                                                
                                                                
                                                                <input type="number"   placeholder="Price in Rs:" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...addproductformik.getFieldProps('price')} required />  
                                                                {addproductformik.touched.price&&addproductformik.errors.price?<div className='errors'>{addproductformik.errors.price}</div>:null}

                                                                <select className="form-control form-control-sm mt-3" {...addproductformik.getFieldProps('category_id')}>
                                                                <option className="form-control form-control-sm mt-3">Select Category</option>
                                                                    {allcategories&&allcategories.map((cat)=>{
                                                                        return(
                                                                        <option className="form-control form-control-sm mt-3" value={cat.id}>{cat.category}</option>
                                                                        )
                                                                    })}
                                                                    
                                                                </select>
                                                                <textarea className='form-control form-control-sm mt-3' placeholder="Description" autoComplete='new-password' {...addproductformik.getFieldProps('description')}></textarea>
                                                                {addproductformik.touched.description&&addproductformik.errors.description?<div className='errors'>{addproductformik.errors.description}</div>:null}
                                                            <button type="submit" className="btn btn-primary btn-block"> ADD</button>  
                                                            
                                                        </form>  
                                                    </div>  
                                                </div>  
                                        </div>  
                                </div>
                            </div> 
                    
                    </div>
                <div className={(s===2 && s!==1 && s!==0 && s!==3 && s!==4 && s!==5 &&s!==6 && s!==7)?'dis':'hide'}>
                        
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
                            <Button className='buttonstyle' onClick={()=>{handleedit(product)}}>EDIT</Button>
                            <Button onClick={()=>handledelete(product)}>DELETE</Button>
                            <br/>
                            <Button onClick={()=>{handleavailability(product)}}  className={product.available_status?"available":"unavailable"}>{product.available_status?"Make it Unavailable":"Make it Available"}</Button>
                            </Card.Text> 
                            </center>   
                            </Card.Body>  
                        </Card>  
                        ))}  
                        </Row>  
                        </Container>  
                </div>
                    <div id="div3" className={(s===3 && s!==0 && s!==1 && s!==2 && s!==4 && s!==5 &&s!==6 && s!==7)?'dis':'hide'} >
                            <div className="pt-5">  
                                    <div className="global-container  main">  
                                        <div className="card login-form">  
                                            <div className="card-body">  
                                                    <h3 className="card-title text-center"> <b>Add Category</b>  </h3>  
                                                    <div className="card-text">  
                                                        <form onSubmit={addcategoryformik.handleSubmit} className="form m-1" >  
                                                            
                                                                
                                                                <input type="text"  placeholder="Plese enter category name"className="form-control form-control-sm mt-3" autoComplete='new-password' {...addcategoryformik.getFieldProps('category')} required />  
                                                                {addcategoryformik.touched.category&&addcategoryformik.errors.category?<div className='errors'>{addcategoryformik.errors.category}</div>:null}
                                                                
                                                            <button type="submit" className="btn btn-primary btn-block"> ADD</button>  
                                                            
                                                        </form>  
                                                    </div>  
                                                </div>  
                                        </div>  
                                </div>
                            </div> 
                    
                    </div>
                    <div className={(s===4 && s!==1 && s!==2 && s!==3 && s!==0 && s!==5 &&s!==6 && s!==7)?'dis':'hide'}>
                    <input type="text" className='form-control form-control-sm' value={driversearch} onChange={(e)=>setdriversearch(e.target.value)} placeholder="search...."/>
                        <Container className='p-4'>  
                            <Row>  
                            
                        { alldrivers&& alldrivers.filter(driver=>driver.name.toLowerCase().includes(driversearch.toLowerCase())).map((driver,ui) => (  
                        <Card
                            
                            key={ui}  
                            
                            style={{width:"23%"}}  
                            className="m-2 car"  
                        >  
                            <Card.Header><b><center>DriverID:{driver.id}</center></b></Card.Header>  
                            <Card.Body>
                            <center>
                            <Card.Title><b><center>{driver.name}</center></b></Card.Title>  
                            <Card.Text>
                            <img src={student1} className="imagestyle"/>
                            <br/>
                            Email:  <b>{driver.email}</b>
                            <br/>
                        PhoneNumber: <b>{driver.phonenumber}</b>
                            
                            </Card.Text> 
                            </center>   
                            </Card.Body>  
                        </Card>  
                        ))}  
                        </Row>  
                        </Container>  
                </div>
                    <div id="div5" className={(s===5 && s!==0 && s!==1 && s!==2 && s!==4 && s!==3 &&s!==6 && s!==7)?'dis':'hide'} >
                            <div className="pt-5">  
                                    <div className="global-container  main">  
                                        <div className="card login-form">  
                                            <div className="card-body">  
                                                    <h3 className="card-title text-center"> <b>Add Driver</b>  </h3>  
                                                    <div className="card-text">  
                                                        <form onSubmit={adddriverformik.handleSubmit} className="form m-1" >  
                                                            
                                                                
                                                        <input type="text"  placeholder="Username"className="form-control form-control-sm mt-3" autoComplete='new-password' {...adddriverformik.getFieldProps('username')} required />  
                                            
                                            {adddriverformik.touched.username&&adddriverformik.errors.username?<div className='errors'>{adddriverformik.errors.username}</div>:null}
                                            
                                            <input type="email"  placeholder="Email Id" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...adddriverformik.getFieldProps('email')} required />  
                                            {adddriverformik.touched.email&&adddriverformik.errors.email?<div className='errors'>{adddriverformik.errors.email}</div>:null}
                                            
                                            
                                            <input type="number"   placeholder="phone Numer" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...adddriverformik.getFieldProps('phonenumber')} required />  
                                            {adddriverformik.touched.phonenumber&&adddriverformik.errors.phonenumber?<div className='errors'>{adddriverformik.errors.phonenumber}</div>:null}
                                            <input type="password"    placeholder="Password"  className="form-control form-control-sm mt-3"  {...adddriverformik.getFieldProps('password')} />  
                                        
                                            {adddriverformik.touched.password&&adddriverformik.errors.password?<div className='errors'>{adddriverformik.errors.password}</div>:null}
                                            <input type="password"   placeholder="Confirm  Password" className="form-control form-control-sm mt-3"  {...adddriverformik.getFieldProps('confirmpassword')} required  />  
                                            {adddriverformik.touched.confirmpassword&&adddriverformik.errors.confirmpassword?<div className='errors'>{adddriverformik.errors.confirmpassword}</div>:null}
                                        
                                        <button type="submit" className="btn btn-primary btn-block"> ADD </button> 
                                                            
                                                        </form>  
                                                    </div>  
                                                </div>  
                                        </div>  
                                </div>
                            </div> 
                    
                    </div>
                    <div className={(s===6 && s!==1 && s!==2 && s!==3 && s!==4 && s!==5 &&s!==0 && s!==7)?'dis':'hide'}>
                        
                        <Container className='p-4'>  
                            <Row>  
                            
                        { allproducts&& allproducts.map((product,ui) => (  
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
                            <Button className='buttonstyle' onClick={()=>{handleedit(product)}}>EDIT</Button>
                            <Button onClick={()=>handledelete(product)}>DELETE</Button>
                            <br/>
                            <Button onClick={()=>{handleavailability(product)}}  className={product.available_status?"available":"unavailable"}>{product.available_status?"Make it Unavailable":"Make it Available"}</Button>
                            </Card.Text> 
                            </center>   
                            </Card.Body>  
                        </Card>  
                        ))}  
                        </Row>  
                        </Container>  
                </div>
                    <div className={(s===7 && s!==1 && s!==2 && s!==3 && s!==0 && s!==5 &&s!==6 && s!==4)?'dis':'hide'}>
                        <input type="text" className='form-control form-control-sm' value={usersearch} onChange={(e)=>setusersearch(e.target.value)} placeholder="search...."/>
                        <Container className='p-4'>  
                            <Row>  
                            
                        { allusers&& allusers.filter(user=>user.name.toLowerCase().includes(usersearch.toLowerCase())).map((user,ui) => (  
                        <Card
                            
                            key={ui}  
                            
                            style={{width:"23%"}}  
                            className="m-2 car"  
                        >  
                            <Card.Header><b><center>UserID:{user.id}</center></b></Card.Header>  
                            <Card.Body>
                            <center>
                            <Card.Title><b><center>{user.name}</center></b></Card.Title>  
                            <Card.Text>
                            <img src={student1} className="imagestyle"/>
                            <br/>
                            Email:  <b>{user.email}</b>
                            <br/>
                        PhoneNumber: <b>{user.phonenumber}</b>
                            
                            </Card.Text> 
                            </center>   
                            </Card.Body>  
                        </Card>  
                        ))}  
                        </Row>  
                        </Container>  
                </div>
                <div id="div8" className={(s===8 && s!==0 && s!==2 && s!==3 && s!==4 && s!==5 &&s!==6 && s!==7 &&s!==1)?'dis':'hide'}>
                            <div className="pt-5">  
                                    <div className="global-container  main">  
                                        <div className="card login-form">  
                                            <div className="card-body">  
                                                    <h3 className="card-title text-center"> <b>Edit Product</b>  </h3>  
                                                    <div className="card-text">  
                                                        <form className="form m-1" >  
                                                            
                                                                
                                                                <input type="text" name="name" value={editpro.name} placeholder="Name"className="form-control form-control-sm mt-3" autoComplete='new-password'  required  onChange={(e)=>seteditpro({...editpro,name:e.target.value})}/>  
                                                            
                                                                
                                                                
                                                                <input type="text" name="" value={editpro.image} placeholder="Image" className="form-control form-control-sm mt-3" autoComplete='new-password' onChange={(e)=>seteditpro({...editpro,image:e.target.value})}  required />  
                                                                
                                                                
                                                                
                                                                <input type="number" value={editpro.price}  placeholder="Price in Rs:" className="form-control form-control-sm mt-3" autoComplete='new-password'   required  onChange={(e)=>seteditpro({...editpro,price:e.target.value})}/>  
                                                                

                                                                <select className="form-control form-control-sm mt-3" onChange={(e)=>seteditpro({...editpro,category:parseInt(e.target.value)})}>
                                                                    {allcategories&&allcategories.map((cat)=>{
                                                                        return(
                                                                        <option className="form-control form-control-sm mt-3" value={cat.id}>{cat.category}</option>
                                                                        )
                                                                    })}
                                                                    
                                                                </select>
                                                                <textarea className='form-control form-control-sm mt-3'value={editpro.description} placeholder="Description" autoComplete='new-password' onChange={(e)=>seteditpro({...editpro,description:e.target.value})} ></textarea>
                                                                
                                                            <button type="submit" className="btn btn-primary btn-block" onClick={handleupdate}> UPDATE</button>  
                                                            
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