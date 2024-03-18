import React from 'react';
import Dashboard from './pages/Dashboard'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./component/Navbar/Navbar";
import HomeInfo from "./pages/homeInformation/HomeInfo";
import LoginImage from "./pages/homeInformation/LoginImage";


const EXCLUDES = ['/admin-login', '/forgot-password']

function App() {
  let {pathname} = useLocation();

  return (
      <div className={'App'}>
          {
              !EXCLUDES.includes(pathname) ? <Navbar/> : null
          }
          <Routes>
              <Route path={'/'} element={<Navigate to={"/admin-login"} />} />
              <Route path={'/admin-login'} element={<Login />} />
              <Route path={'/forgot-password'} element={<ForgotPassword />}/>
              <Route path={"/admin/dashboard"} element={<Dashboard />} />
              <Route path={"/admin/all-info"} element={<HomeInfo />} />
              <Route path={"/admin/login-image"} element={<LoginImage />} />
          </Routes>
      </div>
  )
}

export default App;
