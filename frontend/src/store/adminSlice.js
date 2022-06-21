import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const adminSlice= createSlice({
  name: 'admin',
  initialState: {
    allproducts:[],
    allusers:[],
    alldrivers:[],
    allcategories:[],
    allorders:[]
  },
  reducers: {
    loadallusers: (state,action) => {
      state.allusers=[]
      state.allusers.push(action.payload);
      
      
    },
    loadallorders: (state,action) => {
      state.allorders=[]
      state.allorders.push(action.payload);
      
      
    },
    loadallproducts: (state,action) => {
      state.allproducts=[]
      state.allproducts.push(action.payload);
    },
    loadalldrivers: (state,action) => {
      state.alldrivers=[]
      state.alldrivers.push(action.payload);
    },
    loadallcategories: (state,action) => {
      state.allcategories=[]
      state.allcategories.push(action.payload);
    },
  },
});
export function getallusers(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('https://brahmi-ecom-backend.herokuapp.com//admin/allusers',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallusers(data)))
    .catch((err)=>console.log(err))

  }

}
export function getalldrivers(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('https://brahmi-ecom-backend.herokuapp.com//admin/alldrivers',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadalldrivers(data)))
    .catch((err)=>console.log(err))

  }


}
export function getallcategories(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('https://brahmi-ecom-backend.herokuapp.com//admin/allcategories',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallcategories(data)))
    .catch((err)=>console.log(err))

  }


}
export function getallproducts(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/admin/allproducts',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallproducts(data)))
    .catch((err)=>console.log(err))

  }


}
export function addcategory(category){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    fetch('http://localhost:8000/admin/addcategory',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(category)
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallcategories(data)))
    .catch((err)=>console.log(err))

  }
}
export function adddriver(driver){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch('http://localhost:8000/admin/adddriver',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(driver)
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadalldrivers(data)))
    .catch((err)=>console.log(err))

  }
}
export function addproduct(product){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
   
    fetch('http://localhost:8000/admin/addproduct',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(product)
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallproducts()))
    .catch((err)=>console.log(err))
}
}
export function updatingproduct(pro){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/updateproduct/${pro.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      },
      body:JSON.stringify(pro)
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallproducts(data)))
    .catch((err)=>console.log(err))




  }

}
export function updateprofile(profile){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/updateprofile/${profile.id}`,{
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
export function deletion(pro){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/deleteproduct/${pro.id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallproducts()))
    .catch((err)=>console.log(err))
}

}
export function makeitavailable(pro){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/enableproduct/${pro.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallproducts()))
    .catch((err)=>console.log(err))




  }

}
export function makeitunavailable(pro){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/disableproduct/${pro.id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallproducts()))
    .catch((err)=>console.log(err))




  }

}
export function getallorders(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/admin/allorders',{
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
export function acceptupdate(id){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/acceptorder/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallorders()))
    .catch((err)=>console.log(err))
}

}
export function rejectupdate(id){
  return(dispatch)=>{
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    
    fetch(`http://localhost:8000/admin/rejectorder/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(getallorders()))
    .catch((err)=>console.log(err))
}

}
export const { loadallcategories,loadalldrivers,loadallproducts,loadallusers ,loadallorders} = adminSlice.actions;
export default adminSlice.reducer;
