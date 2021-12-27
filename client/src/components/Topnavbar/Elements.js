import styled from 'styled-components'

export const TopnavContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color:#FF7400;
    height: 2.5rem;  
`;

export const TitleContainer=styled.div`
    padding:5px;
    font-size: 20px;
    justify-content: center;
    font-weight: bold;
    color: #fff;
`;

export const MobileIcon = styled.div`
    display:none;
    @media screen  and (max-width:768px){
        display:block;
        position:absolute;
        font-size: 1rem;
        cursor:pointer;
        color:#fff;
    }
`;


export const NavLogout = styled.div`
    color: #fff;
    white-space: nowrap;
    padding: 8px 18px;
    border: none;
    cursor: pointer;
   

    @media screen  and (max-width:768px){
        margin-right:15px;  
    }
`;

