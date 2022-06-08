import React from 'react'
import Dashboard from './Dashboardd'
import Navbar from './Navbard'
import Sidebar from './Sidebard'
import './Driver.css'

export const Driver= () => {
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
