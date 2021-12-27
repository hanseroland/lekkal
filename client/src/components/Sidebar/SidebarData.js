import React from 'react';
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as ImIcons from 'react-icons/im';




export const SidebarData = [
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