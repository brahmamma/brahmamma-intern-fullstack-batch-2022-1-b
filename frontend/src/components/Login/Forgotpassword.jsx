import './Login.css'
import log_logo from '../../log_logo.png'
import React,{useRef}from 'react'
import {Link} from 'react-router-dom'
import { updatepassword } from '../../store/authenticSlice'
import { useFormik } from 'formik'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { useDispatch} from 'react-redux'
YupPassword(yup);


export const Forgotpassword = () => {
    const id=JSON.parse(window.localStorage.getItem('id'))
    const dispatch=useDispatch();
    const validations=yup.object().shape({
        password:yup.string().required('Password is required').min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special').max(30,'Maximum 30 charracters are allowed')
                    .minLowercase(1,'password must contain at least 1 lower case letter').minUppercase(1,'password must contain at least 1 upper case letter').minNumbers(1, 'password must contain at least 1 number')
                    .minSymbols(1, 'password must contain at least 1 special character'),
        confirmpassword:yup.string().required(' confirm Password is required').oneOf([yup.ref('password'),null],'password and confirm passwords should match..'),       

    })

    const formik=useFormik({
        initialValues:{
            password:'',
            confirmpassword:''

        },
        validationSchema:validations,
        
        onSubmit:(values)=>{
           
            const newpassword={
                password:values.password,
            }
            window.localStorage.removeItem('id')
            dispatch(updatepassword(id,newpassword))
           
        }
        
    })
var passwordref=useRef();
var cpref=useRef()
  return (
     
    <div className="pt-5">  
            <div className="global-container  main">  
                <div className="card login-form car">  
                    <div className="card-body">  
                        <img src={log_logo} className='logo-image'/> 
                        <div className="card-text">  
                            <form onSubmit={formik.handleSubmit} className="form m-1">  
                                <input type="password"    placeholder="🔒Password"  className="form-control form-control-sm mt-3"  {...formik.getFieldProps('password')} ref={passwordref}/>  
                                  
                                  {formik.touched.password&&formik.errors.password?<div className='errors'>{formik.errors.password}</div>:null}
                                  <input type="password"   placeholder="🔒Confirm  Password" className="form-control form-control-sm mt-3"  {...formik.getFieldProps('confirmpassword')} required ref={cpref} />  
                                  {formik.touched.confirmpassword&&formik.errors.confirmpassword?<div className='errors'>{formik.errors.confirmpassword}</div>:null}
                                  
                            
                                <button type="submit" className="btn btn-primary btn-block"> Update </button>  
                                
                                <div className="sign-up">  
                                    Don't have an account? <Link to='/register'> Register</Link> as a User 
                                </div> 
                                <div className="sign-up">  
                                    <Link to='/'>Login</Link>  
                                </div>   
                            </form>  
                        </div>  
                    </div>  
            </div>  
    </div>
</div>

  )
}
