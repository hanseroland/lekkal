import React from 'react'
import {MobileIcon, TopnavContainer,NavLogout, TitleContainer} from './Elements'
import{AiOutlineLogout,AiOutlineLogin} from 'react-icons/ai'
import {FaBars, FaSignInAlt} from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'



const Topnav = ({toggle}) => {





     return (  
        <TopnavContainer>
            <TitleContainer>
                <h4>Eat Now</h4>
            </TitleContainer>
            <div style={{justifyContent:"flex-end",display:"flex"}} >
                <NavLogout>
                    <IconButton aria-label="" >
                        <FaSignInAlt color="white" size={25}  />
                    </IconButton>
                </NavLogout>
                
                <MobileIcon  onClick={toggle} >
                        <FaBars  size={25}  />
                </MobileIcon> 
            </div>
            
       </TopnavContainer> 
    )
}

export default Topnav