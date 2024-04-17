import React, { useEffect } from 'react';
import {Helmet} from "react-helmet";
import {useSelector, useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";
import loginImage from "../assets/images/login.jpg";
import { API_URL } from '../Api';
import { loginImageListRequest } from '../store/actions/loginImage';

const LogoutWrapper = ({children,helmetTitle}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.users.token);

    const loginImageList = useSelector(state => state.loginImage.loginImagesList)

    useEffect(() => {
        dispatch(loginImageListRequest())
    }, []);

    if(token){
        return <Navigate to={'/homeInformation'}/>
    }

    return (
        <div className={'logout-wrapper'} style={{
            backgroundImage: loginImageList[0] ? `url(${API_URL}/${loginImageList[0].image})` : `url(${loginImage})`,
        }}>
            <Helmet>
                <title>
                    {helmetTitle}
                </title>
            </Helmet>
            {children}
        </div>
    );
};

export default LogoutWrapper;
