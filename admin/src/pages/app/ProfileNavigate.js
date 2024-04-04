import React from 'react';
import {Route, Routes} from "react-router-dom";
import Account from "./profiles/Account";
import Profile from "./profiles/Profile";
import Users from "./profiles/Users";
import Settings from "./profiles/Settings";
import EditProfile from "./EditProfile";
import EditAccountPassword from "./EditAccountPassword";
import HomeInfo from "./profiles/homeInformation/HomeInfo";
import LoginImage from "./profiles/homeInformation/LoginImage";
import Massagers from "./profiles/homeInformation/Massagers";
import AddNewLoginImage from "./profiles/homeInformation/AddNewLoginImage";
import AddNewMassagers from "./profiles/homeInformation/AddNewMassagers";

const ProfileNavigate = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Account/>}>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/information'} element={<HomeInfo/>}/>
                <Route path={'/information/login-image'} element={<LoginImage/>}/>
                <Route path={'/information/add-new-login-image'} element={<AddNewLoginImage/>}/>
                <Route path={'/information/massagers'} element={<Massagers/>}/>
                <Route path={'/information/add-new-massagers'} element={<AddNewMassagers/>}/>
                <Route path={'/users/:page'} element={<Users/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
            </Route>
            <Route path={'/edit-profile'} element={<EditProfile/>}/>
            <Route path={'/edit-account-password'} element={<EditAccountPassword/>}/>
            <Route path={'*'} element={<Account/>}/>
        </Routes>
    );
};

export default ProfileNavigate;
