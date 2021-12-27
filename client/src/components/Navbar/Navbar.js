import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import { 
   Nav, 
   NavBtn,
   NavIcon, 
   NavMenu, 
   LogoIcon
   } 
from './NavbarElements';
import {Button } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions'; 




const Navbar = ({toggle}) => {


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logout())
  };
 
  
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav> 
          <LogoIcon onClick={toggle}   >
            <FaIcons.FaBars  />
          </LogoIcon>
          <NavIcon to='/'>
               Lekkal Rek
         </NavIcon>
          <NavMenu>
           
           
          </NavMenu>
          <NavBtn>
            {userInfo ? (
              <>
              <NavIcon to='#'>
                 <FaIcons.FaUser/>
                  {userInfo.pseudo}
              </NavIcon>
               <NavIcon to='#'>
                 <Button
                   variant="text"
                   color="inherit"
                   startIcon={<AiIcons.AiOutlineLogout/>}
                   onClick={()=>handleLogout()}
                 />
              </NavIcon>
              </>
            ) : (
              <>
              <NavIcon to='/connexion'>
                  <FaIcons.FaUser  />
                  Se connecter
              </NavIcon>
             
              </>
             )} 
          </NavBtn>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;