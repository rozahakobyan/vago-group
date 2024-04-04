import React from 'react';
import {Helmet} from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import Whatsapp from './whatsapp';
// import {useSelector} from "react-redux";
// import {userProfileRequired} from "../store/actions/users";

function Wrapper({children, helmetTitle}) {
    // const token = useSelector(state => state.users.token);

    // if (!token) {
    //     return <Navigate to={'/'} replace/>
    // }

    return (
        <div className={'wrapper'}>
            <Helmet><title>{helmetTitle}</title></Helmet>
            <div className={"container"}>
                <Header />
                {children}
                
                <Footer />
                <Whatsapp/>
            </div>
        </div>
    );
}

export default Wrapper;