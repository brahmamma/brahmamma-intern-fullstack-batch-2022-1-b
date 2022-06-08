import { createSlice } from '@reduxjs/toolkit';
export const authenticSlice= createSlice({
  name: 'authentication',
  initialState: {
    users:[],
    tokenlog:null,
    loggeduser:{}
  },
  reducers: {
    loadusers: (state,action) => {
      state.users=[]
      state.users.push(action.payload);
    },
    loadtoken: (state,action) => {
      state.tokenlog=action.payload;
    },
    loggeduser:(state,action)=>{
      state.loggeduser=action.payload;
      
      
    },
    logout:(state,action)=>{
      state.loggeduser='';
      state.tokenlog=null

    }
  },
});
export function getData(){
  return((dispatch)=>{

    fetch('http://localhost:8000/allusers')
    .then((res)=>res.json())
    .then((data)=>dispatch(loadusers(data)))

  })
}
export function loginuser(loguser){
  return(dispatch)=>{
    fetch('http://localhost:8000/loginauthentication',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(loguser)
    })
    .then((res)=>{
      if(res.status===200){
        res.json().then((data)=>{
          if(data.user.role_id===1){
            alert("Login Successful as admin")
            dispatch(loadtoken(data.token))
            dispatch(loggeduser(data.user))
            localStorage.setItem('token',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            window.location.href='/admin/home'
            
          }
          if(data.user.role_id===2){
            alert("Login Successful as driverr")
            dispatch(loadtoken(data.token))
            dispatch(loggeduser(data.user))
            localStorage.setItem('token',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            window.location.href='/driver/home'
           
          }
          if(data.user.role_id===3){
            alert("Login Successful as user")
            dispatch(loadtoken(data.token))
            dispatch(loggeduser(data.user))
            localStorage.setItem('token',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            window.location.href='/user/home'
          }
      })
    }
      if(res.status===405){
        alert('password did not match')
        
        }
        if(res.status===410){
          alert('user not found')
          window.location.reload()
          }
        if(res.status===500){
          alert('Internal server error')
          
        }
      
      
    })
    
  }
}



export function registeruser(newuser){
  return(dispatch)=>{
    fetch('http://localhost:8000/userregister',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(newuser)
            }).then((res)=>{
              if(res.status===200){
                dispatch(getData())
                alert("Registerd succesfully login now..")
                window.location.href='/login'
              }
              if(res.status===400){{
                alert("User existed")
                window.location.reload()
              }}
              if(res.status===500){
                alert("Internal server error")
                window.location.reload()
              }
            })
            
            
}}
export function loggingout(){
  return(dispatch)=>{{
    dispatch(logout)
  }}
}


export const { loadusers,loadtoken ,loggeduser,logout} = authenticSlice.actions;
export default authenticSlice.reducer;
