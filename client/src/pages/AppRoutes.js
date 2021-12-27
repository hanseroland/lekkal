import React from 'react'
import {Route} from 'react-router-dom'

const AppRoutes = ({element: Element,layout:Layout,...rest}) => {
  
  return  (
      <Route element={<Layout/>}  >
        <Route  {...rest}
           
            render={props => (
               
                    <Element {...props} />
            )}
        />
    </Route>
     )
}

export default AppRoutes