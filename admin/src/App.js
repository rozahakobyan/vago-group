import React from 'react';
import Home from './pages/Home'
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={"/admin-login"} />} />
      <Route path={'/admin-login'} element={<Login />} />
      <Route path={'/forgot-password'} element={<ForgotPassword />}/>
      <Route path={"/admin/home"} element={<Home />} />
    </Routes>
  )
}

export default App;
