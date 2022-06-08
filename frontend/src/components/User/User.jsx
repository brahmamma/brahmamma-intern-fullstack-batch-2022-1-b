import React from 'react'
import Dashboard from './Dashboardu'
import Navbar from './Navbaru'
import Sidebar from './Sidebaru'
import './User.css'

export const User= () => {
  return (
    <div>
        <Navbar/>
            <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
            <Sidebar/>
            <Dashboard/>
            </div>
            </div>
        
    </div>
  )
}
