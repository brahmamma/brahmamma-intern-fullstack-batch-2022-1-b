import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const adminSlice= createSlice({
  name: 'admin',
  initialState: {
    allproducts:[],
    allusers:[],
    alldrivers:[],
    allcategories:[]
  },
  reducers: {
    loadallusers: (state,action) => {
      state.allusers=[]
      state.allusers.push(action.payload);
      
      
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
  const token=localStorage.getItem('token')
  const user=localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/admin/allusers',{
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
  const token=localStorage.getItem('token')
  const user=localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/admin/alldrivers',{
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
  const token=localStorage.getItem('token')
  const user=localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/admin/allcategories',{
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
  const token=localStorage.getItem('token')
  const user=localStorage.getItem('user')
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
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
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
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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
    .then((data)=>dispatch(loadallproducts(data)))
    .catch((err)=>console.log(err))
}
}
export function updatingproduct(pro){
  return(dispatch)=>{
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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
export function deletion(pro){
  return(dispatch)=>{
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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
    const token=localStorage.getItem('token')
    const user=localStorage.getItem('user')
    
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

export const { loadallcategories,loadalldrivers,loadallproducts,loadallusers } = adminSlice.actions;
export default adminSlice.reducer;
