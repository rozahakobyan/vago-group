import React, { useCallback } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Account from "../helpers/Account";
import { createUserData } from "../store/actions/users";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.users.token);

    const handleLogOut = useCallback(() => {
        Account.deleteStrong()
        dispatch(createUserData())
    }, [])

    return (
        <header>
            <div className="header-blocks">
                <NavLink to={"/home"}>
                    <div className="logo"><strong>VAGO-GROUP</strong></div>
                </NavLink>
                <div className="header-block">
                    <p className="mail-title">Email:</p>
                    <NavLink>
                        <div className="email">inchvorban@mail.ru</div>
                    </NavLink>
                </div>
                <div className="header-block">
                    <p className="phone-title">Phone:</p>
                    <div className="number">+374 77-777-777</div>
                </div>
                <div className={'header-block'}>
                    <div className={'header-block-buttonArea'}>
                        <div className={'header-block-login'}>
                            {token ? <div className={"log-out"} onClick={handleLogOut}>
                                <p>Log Out</p>
                            </div> : <div className={"log-in"} onClick={() => navigate('/login')}>
                                <p>Login</p>
                            </div>}
                        </div>
                        <div className={'header-block-language'}>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <NavLink to={'/'}>
                    <div className="button"><strong>Home</strong></div>
                </NavLink>
                <NavLink to={"/construction"}>
                    <div className="button"><strong>Construction</strong> </div>
                </NavLink>
                <NavLink to={'/employment-agency'}>
                    <div className="button"><strong>Employment agency</strong></div>
                </NavLink>
                <NavLink to={'/logistic'}>
                    <div className="button"><strong>Logistics</strong></div>
                </NavLink>
            </div>
        </header>
    );
}

export default Header;