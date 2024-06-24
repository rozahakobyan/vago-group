import React from 'react';
import Home from './pages/Home'
import { Route, Routes, Navigate } from 'react-router-dom';
import Construction from './pages/Construction';
import EmploymentAgency from './pages/EmploymentAgency';
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Registration from "./pages/Registration";
import ActivateUser from "./pages/ActivateUser";
import Logistic from './pages/Logistic';
import VacanciesDetales from './pages/VacanciecDetales';
import Taxi from './pages/Taxi';
import TaxiCarDetales from './pages/TaxiCarDetales';

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
      <Route path={'/logistic'} element={<Logistic/>}/>
      <Route path={'/vacancies-detales/:id'} element={<VacanciesDetales/>}/>
      <Route path={'/taxi'} element={<Taxi/>}/>
      <Route path={'/taxi-car-detales/։id'} element={<TaxiCarDetales/>}/>
    </Routes>
  )
}

export default App;
