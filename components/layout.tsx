import React, { useState } from 'react'
import Header from './header'
import SideBar from './sideBar'


function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div>
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1 flex-col md:pl-64">
                <Header setSidebarOpen={setSidebarOpen}/>
            </div>
        </div>
    )
}

export default Layout