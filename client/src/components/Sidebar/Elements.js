import styled from 'styled-components'

export const Container = styled.div`
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 17rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
  
    @media screen  and (max-width:768px){
        display:none;
    }
`;

export const ProfilContainer = styled.div`
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-bottom:  #838383;
    margin-bottom: 10px;
`;

export const ProfileImg = styled.img`
    height: 6rem;
    width: 6rem;
    margin: auto;
    display: block;
    border-radius: 50px;
    object-fit: cover;
`;

export const ProfileName = styled.h1`
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    color: #000000;
`;


export const SidebarNav = styled.nav`
  background: #fff;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: auto;
  
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;

  @media screen  and (max-width:768px){
        display:none;
    }
`;

export const SidebarWrap = styled.div`
  width: 100%;
  overflow: auto;
`;
