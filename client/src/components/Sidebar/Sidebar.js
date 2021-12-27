import React,{useState} from 'react'
import {
    Container,
    ProfilContainer,
    ProfileName,
    SidebarNav,
    SidebarWrap,
} from './Elements'
import SubMenu from './SubMenu'
import { SidebarData } from './SidebarData';
  


  
const Sidebar = () => {

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
          <Container>
                
                <ProfilContainer >
                          <ProfileName>
                            Tableau de bord
                          </ProfileName>
                  </ProfilContainer>
                  <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                      {SidebarData.map((item, index) => {
                        return <SubMenu  item={item} key={index} />;
                        })
                      }
                    </SidebarWrap>
                  </SidebarNav>
            
           </Container>
        </>
    )
}

export default Sidebar
