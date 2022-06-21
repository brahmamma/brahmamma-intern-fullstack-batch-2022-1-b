import React from 'react';
import { Route,Redirect} from 'react-router-dom';
 
const Guard = ({ component: Component, ...rest }) => {
 
   function hasJWT() {
       let flag = false;
 
      const t= localStorage.getItem("token") ;
      const rid=JSON.parse(localStorage.getItem('user')).role_id;
       t&&rid===3?flag=true:flag=false;
      
       return flag
   }
 
   return (
       <Route {...rest}
           render={props => (
               hasJWT() ?
                   <Component {...props} />
                   :
                   null
           )}
       />
   );
};
 
export default Guard;