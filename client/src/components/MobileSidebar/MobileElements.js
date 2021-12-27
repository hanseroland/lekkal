import styled from 'styled-components'
import {FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom';

export const  SidebarContainer = styled.aside`
    position:fixed;
    z-index: 999;
    width: 70%;
    height:100%;
    background-color:#FF7400; 
    display: grid;
    align-items:center;
    top:0;
    left:0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen})=>(isOpen ? '100%': '0') };
    top: ${({isOpen})=> (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
    color:#fff
`

export  const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right:1.5rem;
    background: transparent;
    font-size:1rem;
    cursor:pointer;
    outline:none;
`
export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 60px);
    
    @media screen and (max-width: 849px){
        grid-template-rows: repeat(6, 60px)
    }

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6, 60px)
    }
`

export const SidebarWrapper = styled.div`
    color : #fff;
`

export const SidebarLink = styled(Link)`
    display: flex;
    align-items:center;
    height: 40px;
    width: 160px;
    margin-left:20px;
    font-size: 0.7rem;
    transition: 0.2s ease-in-out;
    text-decoration:none;
    color:#fff;
    cursor:pointer;

`
export const ContainerLink = styled(Link)`
     border-left: 3px solid ${props => props.active ? props.theme.activeMenu : "transparent"};
    width: 70%;
    padding: 0.3rem;
    padding-left: 1rem;
    margin-left:5px;
    cursor: pointer;
    display: flex;
    text-decoration:none;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.3rem;
    transition: 0.2s all ease-in-out;


    &:hover {
        transform: scale(1.12);
        transition: all 0.2s ease-in-out;
    }
`
export const SideBtnWrap = styled.div`
    display:flex;
    justify-content: center;
`

export  const IconMobile = styled.div`
    margin-right: 20px;
    font-size: 0.95rem;
    transform: translateY(3px);
    transition: .2s ease;

`