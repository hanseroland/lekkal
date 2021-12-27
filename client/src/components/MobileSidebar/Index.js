import React from 'react'
import {
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    IconMobile,
    ContainerLink
} from './MobileElements'
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as ImIcons from 'react-icons/im';




export const items = [
  {
    title: 'Accueil',
    path: '/',
    icon: <ImIcons.ImHome />,
   
  },
  {
    title: 'Tableau de bord',
    path: '/dashboard',
    icon: <HiIcons.HiChartBar />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

   
  },
  {
    title: 'Utilisateurs',
    path: '/dashboard/utilisateurs',
    icon: <ImIcons.ImUsers />,
   
  },
  {
    title: 'Restaurants',
    path: '/dashboard/restaurants',
    icon: <MdIcons.MdOutlineFoodBank />,
   
  },
  {
    title: 'Reservations',
    path: '/dashboard/reservations',
    icon: <MdIcons.MdOutlineDateRange />,
   
  }
  
]; 


const MobileSidebar = ({isOpen,toggle}) => {
    return (
        <>
            <SidebarContainer isOpen={isOpen}  onClick={toggle} >
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                     {items.map((item,index) => (
                        <SidebarLink
                         key={index}
                         whiteblack={true}
                         to={item.path}
                        >
                           <IconMobile>{item.icon}</IconMobile>
                           {item.title}
                        </SidebarLink>
                    ))}
                    </SidebarMenu>
                </SidebarWrapper>
            </SidebarContainer>
        </>
    )
}

export default MobileSidebar
