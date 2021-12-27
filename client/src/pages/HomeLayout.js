import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Topnav from '../components/Topnavbar'

function HomeLayout({children}) {
    return (
        <>
             <Navbar/>
            {children}
        </>
    )
}

export default HomeLayout
