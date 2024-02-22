import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import {useDispatch, useSelector} from "react-redux";
import {userProfileRequired} from "../store/actions/users";
import {Navigate} from "react-router-dom";

function Wrapper({children, helmetTitle}) {
    const token = useSelector(state => state.users.token);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userProfileRequired())
    },[])

    if (!token) {
        return <Navigate to={'/'} replace/>
    }

    return (
        <div className={'wrapper'}>
            <Helmet><title>{helmetTitle}</title></Helmet>
            <div className={"container"}>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default Wrapper;