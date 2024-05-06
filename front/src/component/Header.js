import React, { useCallback, useMemo, useEffect } from 'react';
import { contactsListRequest } from "../store/actions/contacts";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../helpers/Account";
import { createUserData } from "../store/actions/users";
import { API_URL } from "../Api"

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.users.token);

    const handleLogOut = useCallback(() => {
        Account.deleteStrong()
        dispatch(createUserData())
    }, [])

    const contactsList = useSelector(state => state.contacts.contactsList);

    useEffect(() => {
        dispatch(contactsListRequest())
    }, [])

    const list = useMemo(() => {
        return contactsList.filter(l => {
            if (l.activeContact === true) {
                return l;
            }
        })
    }, [contactsList])

    return (
        <header>
            <div id='verev'>
                {list && list.map(l => (
                    <div className="header-blocks" key={l.id}>
                        <NavLink to={"/homeInformation"}>
                            <div className="logo"><img src={'./img/logo.png'} alt={""} /></div>
                        </NavLink>
                        <div className="header-block">
                            <p className="mail-title">Email:</p>

                            <div className="email">{l.email}</div>

                        </div>
                        <div className="header-block">
                            <p className="phone-title">Phone:</p>
                            <div className="number">{l.phone}</div>
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

                        <div className={'header-block-msg'} >
                            {l.massagersList && l.massagersList.map(lm => (
                                <NavLink to={lm.path} key={lm.id}><div className='msg-box'><img src={`${API_URL}/${lm.massager.headerIcon}`} alt={""} /></div></NavLink>
                            ))}

                        </div>
                    </div>
                ))}
            </div>
            {/* ----------------------------- */}
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