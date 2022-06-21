import { createSlice } from '@reduxjs/toolkit';
export const driverSlice= createSlice({
  name: 'driver',
  initialState: {
    allorders:[],
    selectedorders:[],
    routes:[]
  },
  reducers: {
    loadallorders: (state,action) => {
      state.allorders=[]
      state.allorders.push(action.payload);
    },
    loadselectedorders: (state,action) => {
      state.selected=[]
      state.selectedorders.push(action.payload);
    },
    loadroutes: (state,action) => {
      state.routes=[]
      state.routes.push(action.payload);
      console.log(state.routes)
    }
    
    
  },
});
export function getallorders(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/driver/allorders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallorders(data)))
    .catch((err)=>console.log(err))

  }
}
export function getselectedorders(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/driver/selectedorders',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadselectedorders(data)))
    .catch((err)=>console.log(err))

  }
}
export function selection(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch(`http://localhost:8000/driver/selection/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getselectedorders()))
    .catch((err)=>console.log(err))

  }
}
export function deselection(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch(`http://localhost:8000/driver/deselection/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getselectedorders()))
    .catch((err)=>console.log(err))

  }
}
export function setroute(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  fetch('http://localhost:8000/driver/setroute',{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'token':token,
      'user':user
    }
  })
  .then((res)=>dispatch(getroutes()))
  .catch((err)=>console.log(err))
}
}
export function getroutes(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  fetch('http://localhost:8000/driver/getroutes',{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'token':token,
      'user':user
    }
  })
  .then((res)=>res.json())
  .then((data)=>dispatch(loadroutes(data)))
  .catch((err)=>console.log(err))
}
}
export function cancelled(pres,next,i,l){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  fetch('http://localhost:8000/driver/ordercancel',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'token':token,
      'user':user
    },
    body:JSON.stringify({pres,next,i,l})
  })
  .then((res)=>res.json())
  .then((data)=>dispatch(getroutes()))
  .catch((err)=>console.log(err))
}
}
export function delivered(pres,next,i,l){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  fetch('http://localhost:8000/driver/orderdeliver',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'token':token,
      'user':user
    },
    body:JSON.stringify({pres,next,i,l})
  })
  .then((res)=>res.json())
  .then((data)=>dispatch(getroutes()))
  .catch((err)=>console.log(err))
}
}
export function updateprofile(profile){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/driver/updateprofile/${profile.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(profile)
    })
    .then((res)=>{
      if(res.status==200){
        alert('Please Login With your new Credentials')
        window.location.href='/login'
      }})
    
    .catch((err)=>console.log(err))




  }

}
export const { loadallorders,loadselectedorders,loadroutes } = driverSlice.actions;
export default driverSlice.reducer;
