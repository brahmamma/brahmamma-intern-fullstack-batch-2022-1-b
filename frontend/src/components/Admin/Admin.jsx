import React from 'react'
import Dashboard from './Dashboarda'
import Navbar from './Navbara'
import Sidebar from './Sidebara'
import './Admin.css'

export const Admin= () => {
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
