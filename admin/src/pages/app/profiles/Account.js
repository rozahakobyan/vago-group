import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../../../components/profile/Header";
import Navbar from "../../../components/profile/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {removeUserLogout, userProfileRequest} from "../../../store/actions/users";
import CustomsPortal from "../../../components/CustomsPortal";
import {Account as account} from "../../../helpers/account";

const Account = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [verificationEmail, setVerificationEmail] = useState(false);
    const [open, setOpen] = useState(false);

    const profile = useSelector(state => state.users.profile);

    const path = account.getNavbarUrlPath();

    useEffect(() => {
        dispatch(userProfileRequest())
    }, []);

    useMemo(() => {
        if(window.screen.availWidth <= 640){
            setOpen(true);
        }else{
            setOpen(false)
        }
    }, []);

    useEffect(() => {
        if (profile.status !== 'active') {
            setVerificationEmail(true)
        }
    }, [profile]);

    const verificationAddress = useCallback(() => {
        dispatch(removeUserLogout())
        navigate('/')
    }, []);

    return (
        <div className={'account childrenWidth'}>
            <Header open={open} setOpen={setOpen} path={path}/>
            <div className="container">
                <Navbar open={open}/>
                <Outlet/>
            </div>
            {
                verificationEmail
                    ? <CustomsPortal className={'verification_email'}>
                        <div className="modal">
                            <p>You have successfully uploaded your email address. Enter your email address. To verify your
                                email address, please log in</p>
                            <button onClick={verificationAddress}>Verification Email</button>
                        </div>
                    </CustomsPortal>
                    : null
            }
        </div>
    );
};

export default Account;
