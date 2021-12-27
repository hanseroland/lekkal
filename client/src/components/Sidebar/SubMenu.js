import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SidebarLink = styled(Link)`
  display: flex;
  color:  #838383;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 20px;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    background: #FF7400;
    cursor: pointer;
    color:  #fff;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;



const SubMenu = ({ item }) => {
 

  return (
    <>
      <SidebarLink to={item.path}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SubMenu;