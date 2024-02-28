import React from 'react';
import Home from './pages/Home'
import {Route, Routes, Navigate, useLocation} from 'react-router-dom';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./component/Navbar/Navbar";

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
              <Route path={"/admin/home"} element={<Home />} />
          </Routes>
      </div>
  )
}

export default App;
