import './Login.css'
import log_logo from '../../log_logo.png'
import React,{useRef,useEffect}from 'react'
import {Link} from 'react-router-dom'
import { detailsfind } from '../../store/authenticSlice'
import { useFormik } from 'formik'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { useDispatch,useSelector } from 'react-redux'
YupPassword(yup);


export const Otplogin = () => {

    const dispatch=useDispatch();
    const validations=yup.object().shape({
        email:yup.string().required('email required').email('Inavlid email format')        

    })

var formik=useFormik({
    initialValues:{
        email:''
        
    },
    validationSchema:validations,
    onSubmit:(values)=>{
        dispatch(detailsfind(values))
        

    }
    
    
}) 
var emailref=useRef();
  return (
     
    <div className="pt-5">  
            <div className="global-container  main">  
                <div className="card login-form car">  
                    <div className="card-body">  
                        <h3 className="card-title text-center">  Login  </h3>
                        <img src={log_logo} className='logo-image'/> 
                        <div className="card-text">  
                            <form onSubmit={formik.handleSubmit} className="form m-1">  
                                
                            <input type="email"  placeholder="✉Email Id" className="form-control form-control-sm mt-3" autoComplete='new-password'  {...formik.getFieldProps('email')} required ref={emailref}/>  
                            {formik.touched.email&&formik.errors.email?<div className='errors'>{formik.errors.email}</div>:null}
                                <button type="submit" className="btn btn-primary btn-block"> Login </button>  
                                
                                <div className="sign-up">  
                                    <Link to='/'> Login </Link>with password
                                </div>
                                <div className="sign-up">  
                                    Don't have an account? <Link to='/register'> Register</Link> as a User 
                                </div>   
                            </form>  
                        </div>  
                    </div>  
            </div>  
    </div>
</div>

  )
}
