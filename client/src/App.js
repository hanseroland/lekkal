import React from 'react';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashLayout from './pages/DashLayout';
import Dashboard from './pages/Dashboard';
import Utilisateurs from './pages/Utilisateurs';
import Reservations from './pages/Reservations';
import Tables from './pages/Tables';
import Restaurants from './pages/Restaurants';
import Restaurant from './pages/Restaurant';
import Connexion from './pages/Connexion';
import Reservation from './pages/Reservation';






function App() {
  return (
     
     
      <>
    
          <Router>
              
                  <Routes>
                        <Route  path="/"  element={<Home/>}  />
                        <Route  path="connexion"  element={<Connexion/>}  />
                        <Route  path="/dashboard" element={<DashLayout/>}>
                            <Route  path="utilisateurs"  element={<Utilisateurs/>}  />
                            <Route  path="reservations"  element={<Reservations/>}  />
                            <Route  path="reservation/:id"  element={<Reservation/>}  />
                            <Route  path="restaurants"  element={<Restaurants/>}  />
                            <Route  path="restaurant/:id"  element={<Restaurant/>}  />
                            <Route  path="tables"  element={<Tables/>}  />
                            <Route index element={<Dashboard/>}  />
                       </Route>
                  </Routes>
              
              
                  
              
               <ToastContainer/> 
          </Router>
       
        </>
     
    
  );
}

export default App;
