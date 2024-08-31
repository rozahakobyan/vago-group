import React, { useCallback, useMemo, useEffect } from 'react';
import { contactsListRequest } from "../store/actions/contacts";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../helpers/Account";
import { createUserData } from "../store/actions/users";
import { API_URL } from "../Api"
import Select from "react-select";
import languages from "../assets/data/language";
import translation from "../assets/data/translation";

const formatOptionLabel = ({ label, icon }) => (
    <div style={{ display: "flex" }}>
        <div style={{ marginRight: "10px", color: "#ccc" }}>
            <img src={icon} alt={label} width={20} height={15} />
        </div>
        <div>{label}</div>
    </div>
);

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.users.token);
    const contactsList = useSelector(state => state.contacts.contactsList);

    const language = Account.getLanguage();

    const handleSelectChange = useCallback((selectedOption) => {
        Account.setLanguage(selectedOption.value)
        window.location.reload(false)
    }, [])

    const findSelectValue = useCallback((value) => {
        return languages.find(l => {
            if (l.value === value) {
                return l
            }
        })
    }, [])

    const handleLogOut = useCallback(() => {
        Account.deleteStrong()
        dispatch(createUserData())
    }, [])

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
                            <div className="logo"><img src={'../img/logo.png'} alt={""} /></div>
                        </NavLink>
                        <div className="header-block">
                            <p className="mail-title">Email:</p>

                            <div className="email">{l.email}</div>

                        </div>
                        <div className="header-block">
                            <p className="phone-title">{translation.phone[language]}:</p>
                            <div className="number">{l.phone}</div>
                        </div>
                        <div className={'header-block'}>
                            <div className={'header-block-buttonArea'}>

                                <div className={'header-block-login'}>
                                    {token ? <div className={"log-out"} onClick={handleLogOut}>
                                        <p>{translation.logOut[language]}</p>
                                    </div> : <div className={"log-in"} onClick={() => navigate('/login')}>
                                        <p>{translation.logIn[language]}</p>
                                    </div>}
                                </div>

                                <div className={'header-block-language'}>

                                    <Select defaultValue={() => findSelectValue(language)}
                                        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                        styles={{
                                            menuPortal: (provided) => ({
                                                ...provided,
                                                zIndex: 9999,
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                zIndex: 9999,
                                                bottom: 'auto',
                                            })
                                        }}
                                        formatOptionLabel={formatOptionLabel}
                                        options={languages}
                                        onChange={handleSelectChange}
                                        placeholder={<div>Language...</div>}
                                        isSearchable={false}
                                        className="react-select-containers"
                                        classNamePrefix="react-selects" />

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
                    <div className="button"><strong>{translation.home[language]}</strong></div>
                </NavLink>
                <NavLink to={"/construction"}>
                    <div className="button"><strong>{translation.construction[language]}</strong> </div>
                </NavLink>
                <NavLink to={'/employment-agency'}>
                    <div className="button"><strong>{translation.employmentAgency[language]}</strong></div>
                </NavLink>
                <NavLink to={'/logistic'}>
                    <div className="button"><strong>{translation.logistics[language]}</strong></div>
                </NavLink>
                <NavLink to={'/taxi'}>
                    <div className="button"><strong>{translation.taxi[language]}</strong></div>
                </NavLink>
            </div>
        </header>
    );
}

export default Header;