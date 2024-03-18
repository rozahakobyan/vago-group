import React from 'react';
import {Helmet} from "react-helmet";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const LogoutWrapper = ({children,helmetTitle}) => {
    const token = useSelector(state => state.users.token);

    if(token){
        return <Navigate to={'/homeInformation'}/>
    }

    return (
        <div className={'logout-wrapper'}>
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
