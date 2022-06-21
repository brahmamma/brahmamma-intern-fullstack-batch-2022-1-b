import { createSlice } from '@reduxjs/toolkit';
export const userSlice= createSlice({
  name: 'user',
  initialState: {
    allproducts:[],
    allcategories:[],
    allcartitems:[],
    allorders:[],
    alladdresses:[],
    totalamount:0,
  },
  reducers: {
    loadallcartitems: (state,action) => {
      state.allcartitems=[]
      state.allcartitems.push(action.payload);
    },
    loadallproducts: (state,action) => {
      state.allproducts=[]
      state.allproducts.push(action.payload);
      console.log(state.allproducts)
    },
    loadallorders: (state,action) => {
      state.allorders=[]
      state.allorders.push(action.payload);
    },
    loadallcategories: (state,action) => {
      state.allcategories=[]
      state.allcategories.push(action.payload);
    },
    loadalladdresses: (state,action) => {
      state.alladdresses=[]
      state.alladdresses.push(action.payload);
    },
  },
});
export function getallcategories(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/user/allcategories',{
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
  
    fetch('http://localhost:8000/user/allproducts',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then(data=>dispatch(loadallproducts(data)))
    .catch((err)=>console.log(err))
    

  }


}
export function getallcartitems(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/user/allcartitems',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadallcartitems(data)))
    .catch((err)=>console.log(err))

  }


}
export function getallorders(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/user/allorders',{
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
export function getalladdresses(){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch('http://localhost:8000/user/alladdresses',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>res.json())
    .then((data)=>dispatch(loadalladdresses(data)))
    .catch((err)=>console.log(err))

  }
}
export function addtocart(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
  
    fetch(`http://localhost:8000/user/addtocart/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    })
    .then((res)=>dispatch(getallcartitems()))
    .catch((err)=>console.log(err))

  }
}
export function removefromcart(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
    fetch(`http://localhost:8000/user/removefromcart/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    }
    ).then((res)=>dispatch(getallcartitems()))
  }
  }
export function incquan(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
    fetch(`http://localhost:8000/user/incquan/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    }
    ).then((res)=>dispatch(getallcartitems()))
  }
  }
  export function decquan(id){
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    return(dispatch)=>{
      fetch(`http://localhost:8000/user/decquan/${id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'token':token,
          'user':user
        }
      }
      ).then((res)=>dispatch(getallcartitems()))
    }
    }

export function addaddresss(newadd){
 
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')

  return(dispatch)=>{
    fetch('http://localhost:8000/user/addaddress',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
          'token':token,
          'user':user

      },
      body:JSON.stringify(newadd)
    }).then((res)=>res.json())
    .then((data)=>dispatch(getalladdresses()))
    .catch((err)=>console.log())
  }
}
export function placeorder(pro,add){
  const ord={pro,add}
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')

  return(dispatch)=>{
    fetch('http://localhost:8000/user/placeoneorder',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
          'token':token,
          'user':user

      },
      body:JSON.stringify(ord)
    }).then((res)=>res.json())
    .then((data)=>dispatch(getallorders()))
    .catch((err)=>console.log())
  }
}
export function placeallorders(products,add){
  const ord={products,add}
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')

  return(dispatch)=>{
    fetch('http://localhost:8000/user/placeallorders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
          'token':token,
          'user':user

      },
      body:JSON.stringify(ord)
    }).then((res)=>res.json())
    .then((data)=>dispatch(getallorders()),dispatch(getallcartitems()))
    .catch((err)=>console.log())
  }
}

export function removefromorders(id){
  const token=window.localStorage.getItem('token')
  const user=window.localStorage.getItem('user')
  return(dispatch)=>{
    fetch(`http://localhost:8000/user/deleteorder/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'token':token,
        'user':user
      }
    }
    ).then((res)=>dispatch(getallorders()))
  }
  }
  export function removeaddress(id){
    const token=window.localStorage.getItem('token')
    const user=window.localStorage.getItem('user')
    return(dispatch)=>{
      fetch(`http://localhost:8000/user/deleteaddress/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'token':token,
          'user':user
        }
      }
      ).then((res)=>dispatch(getalladdresses()))
    }
    }
    export function updateprofile(profile){
      return(dispatch)=>{
        const token=window.localStorage.getItem('token')
        const user=window.localStorage.getItem('user')
        
        fetch(`http://localhost:8000/user/updateprofile/${profile.id}`,{
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
export const { loadallcartitems,loadallcategories,loadallorders,loadallproducts,loadalladdresses} = userSlice.actions;
export default userSlice.reducer;
