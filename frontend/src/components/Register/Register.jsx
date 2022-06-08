import './Register.css'
import React,{useRef,useEffect}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {useFormik} from 'formik'
import { getData,registeruser } from '../../store/authenticSlice';
import * as yup from 'yup'
import YupPassword from 'yup-password'

YupPassword(yup);



export default function Register(){
    const dispatch=useDispatch();
    const emails=[]
    const users = useSelector((state) => state.authentic.users);
    users.map((user)=>{
        emails.push(user.email)
    })
    var uref=useRef();
    var eref=useRef();
    var pnref=useRef();
    var pref=useRef();
    var cpref=useRef();
    useEffect(()=>{
        dispatch(getData())
        
    },[])
    
    
    const validations=yup.object().shape({
        username:yup.string().required('Username is required').min(3,'too short..').max(35,'too long...'),
        phonenumber:yup.string().required('phone number rrequired').min(10,'Not valid phone number').max(10,'Not valid phone number').matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,'Not a valid phonne number'),
        password:yup.string().required('Password is required').min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special').max(30,'Maximum 30 charracters are allowed')
                    .minLowercase(1,'password must contain at least 1 lower case letter').minUppercase(1,'password must contain at least 1 upper case letter').minNumbers(1, 'password must contain at least 1 number')
                    .minSymbols(1, 'password must contain at least 1 special character'),
        confirmpassword:yup.string().required(' confirm Password is required').oneOf([yup.ref('password'),null],'password and confirm passwords should match..'),
        email:yup.string().required('email is required').email('Inavlid email format').notOneOf(emails,'Email already Taken!')     

    })

    const formik=useFormik({
        initialValues:{
            username:'',
            email:'',
            phonenumber:'',
            password:'',
            confirmpassword:''

        },
        validationSchema:validations,
        
        onSubmit:(values)=>{
           
            const newuser={
                name:values.username,
                email:values.email,
                phonenumber:values.phonenumber,
                password:values.password,
                role_id:3
            }
            dispatch(registeruser(newuser))
           
        }
        
    })
    
    
  return (
     
    <div className="pt-5">  
            <div className="global-container  main">  
                <div className="card login-form car">  
                    <div className="card-body">  
                        <h3 className="card-title text-center">  Register  </h3>  
                        <div className="card-text">  
                            <form onSubmit={formik.handleSubmit} className="form m-1" >  
                                  
                                    
                                    <input type="text"  placeholder="Username"className="form-control form-control-sm mt-3" autoComplete='new-password' {...formik.getFieldProps('username')} required ref={uref}/>  
                                
                                    {formik.touched.username&&formik.errors.username?<div className='errors'>{formik.errors.username}</div>:null}
                                     
                                    <input type="email"  placeholder="Email Id" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...formik.getFieldProps('email')} required ref={eref}/>  
                                    {formik.touched.email&&formik.errors.email?<div className='errors'>{formik.errors.email}</div>:null}
                                    
                                     
                                    <input type="number"   placeholder="phone Numer" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...formik.getFieldProps('phonenumber')} required ref={pnref}/>  
                                    {formik.touched.phonenumber&&formik.errors.phonenumber?<div className='errors'>{formik.errors.phonenumber}</div>:null}
                                    <input type="password"    placeholder="Password"  className="form-control form-control-sm mt-3"  {...formik.getFieldProps('password')} ref={pref}/>  
                                  
                                    {formik.touched.password&&formik.errors.password?<div className='errors'>{formik.errors.password}</div>:null}
                                    <input type="password"   placeholder="Confirm  Password" className="form-control form-control-sm mt-3"  {...formik.getFieldProps('confirmpassword')} required ref={cpref} />  
                                    {formik.touched.confirmpassword&&formik.errors.confirmpassword?<div className='errors'>{formik.errors.confirmpassword}</div>:null}
                                  
                                <button type="submit" className="btn btn-primary btn-block"> Register </button>  
                                
                                <div className="sign-up">  
                                    Already have an account? <Link to='/'>Login</Link>  
                                </div>  
                            </form>  
                        </div>  
                    </div>  
            </div>  
    </div>
</div>

  )
}
