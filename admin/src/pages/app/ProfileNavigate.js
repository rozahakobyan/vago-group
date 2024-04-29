import React from 'react';
import {Route, Routes} from "react-router-dom";
import Account from "./profiles/Account";
import Profile from "./profiles/Profile";
import Users from "./profiles/Users";
import Settings from "./profiles/Settings";
import EditProfile from "./EditProfile";
import EditAccountPassword from "./EditAccountPassword";
import AddNewHomeInfo from "./profiles/homeInformation/AddNewHomeInfo";
import LoginImage from "./profiles/homeInformation/LoginImage";
import Massagers from "./profiles/massagers/Massagers";
import AddNewLoginImage from "./profiles/homeInformation/AddNewLoginImage";
import AddNewMassagers from "./profiles/massagers/AddNewMassagers";
import Works from "./profiles/works/Works";
import AddNewWork from "./profiles/works/AddNewWork";
import AddNewProducts from './profiles/products/AddNewProducts';
import Products from './profiles/products/Products';
import Partners from "./profiles/partners/Partners";
import AddNewPartners from "./profiles/partners/AddNewPartners";
import Contacts from "./profiles/contacts/Contacts";
import AddNewContact from "./profiles/contacts/AddNewContact";
import Information from "./profiles/homeInformation/Information";
import AddNewPrices from "./profiles/prices/AddNewPrices";
import Prices from "./profiles/prices/Prices";
import Packages from "./profiles/packages/Packages";
import AddNewPackages from "./profiles/packages/AddNewPackages";
import Services from "./profiles/services/Services";
import AddNewServices from "./profiles/services/AddNewServices";
import Histories from "./profiles/homeInformation/Histories";
import AddNewHistory from "./profiles/homeInformation/AddNewHistory";

const ProfileNavigate = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Account/>}>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/information'} element={<Information/>}/>
                <Route path={'/information/add-new-information'} element={<AddNewHomeInfo/>}/>
                <Route path={'/information/login-image'} element={<LoginImage/>}/>
                <Route path={'/information/add-new-login-image'} element={<AddNewLoginImage/>}/>
                <Route path={'/information/histories'} element={<Histories/>}/>
                <Route path={'/information/add-new-history'} element={<AddNewHistory/>}/>
                <Route path={'/massagers'} element={<Massagers/>}/>
                <Route path={'/massagers/add-new-massagers'} element={<AddNewMassagers/>}/>
                <Route path={'/works'} element={<Works/>}/>
                <Route path={'/works/add-new-works'} element={<AddNewWork/>}/>
                <Route path={'/products'} element={<Products/>}/>
                <Route path={'/products/add-new-products'} element={<AddNewProducts/>}/>
                <Route path={'/partners'} element={<Partners/>}/>
                <Route path={'/partners/add-new-partners'} element={<AddNewPartners/>}/>
                <Route path={'/contacts'} element={<Contacts/>}/>
                <Route path={'/contacts/add-new-contacts'} element={<AddNewContact/>}/>
                <Route path={'/prices'} element={<Prices/>}/>
                <Route path={'/prices/add-new-prices'} element={<AddNewPrices/>}/>
                <Route path={'/packages'} element={<Packages/>}/>
                <Route path={'/packages/add-new-packages'} element={<AddNewPackages/>}/>
                <Route path={'/services'} element={<Services/>}/>
                <Route path={'/services/add-new-services'} element={<AddNewServices/>}/>
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
