import React from 'react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MobileSidebar from '../components/MobileSidebar/Index'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { useSelector } from "react-redux";
import { useEffect } from 'react'

function DashLayout({children}) {

    const [isOpen, setIsOpen] = useState(false)
    const user = useSelector((state) => state.userSignin.userInfo);
    const navigate = useNavigate
    const toggle = () => {
        setIsOpen(!isOpen)
    }

   
    return (
        
        <>
            <Sidebar    />
            <MobileSidebar isOpen={isOpen}  toggle={toggle}/>
            <Navbar   toggle={toggle} />
           
            <Outlet />
        </>
    )
}  

export default DashLayout
