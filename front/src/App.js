import React from 'react';
import Home from './pages/Home'
import { Route, Routes, Navigate } from 'react-router-dom';
import Construction from './pages/Construction';
import EmploymentAgency from './pages/EmploymentAgency';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Registration from "./pages/Registration";
import ActivateUser from "./pages/ActivateUser";

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={"/home"} />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration/>}/>
      <Route path={'/activate-user/:email'} element={<ActivateUser/>}/>
      <Route path={'/forgot-password'} element={<ForgotPassword />}/>
      <Route path={"/home"} element={<Home />} />
      <Route path={"/construction"} element={<Construction />} />
      <Route path={'/employment-agency'} element={<EmploymentAgency/>}/>
    </Routes>
  )
}

export default App;
