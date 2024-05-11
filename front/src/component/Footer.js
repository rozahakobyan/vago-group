import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { contactsListRequest } from "../store/actions/contacts";
import {API_URL} from "../Api"
import { NavLink } from "react-router-dom";
import translation from "../assets/data/translation";
import {Account} from "../helpers/Account";

function Footer() {
    const dispatch = useDispatch();

    const contactsList = useSelector(state => state.contacts.contactsList);
    const language = Account.getLanguage();
    
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
        <footer>
            <div className='footer'>
                {list && list.map(l => (
                    <div className="footer-info" key={l.id}>

                        <div className="footer-address">
                            <div className="address-title">{translation.address[language]}</div>
                            <div className="address-text">
                                <p>{l.address}</p>
                            </div>
                        </div>

                        <div className="footer-phone">
                            <div className="footer-phone-title">{translation.phone[language]}</div>
                            <div className="footer-phone-text">
                                <ul style={{ listStyle: "none" }}>
                                    <li>{l.phone}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-email">
                            <div className="footer-email-title">Email</div>
                            <div className="footer-email-text">
                                <ul style={{ listStyle: "none" }}>
                                    <li>{l.email}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-phone">
                            <div className="footer-phone-title">Massager</div>
                            <div className="footer-phone-text">
                                {l.massagersList && l.massagersList.map(lm => (
                                    <ul style={{ listStyle: "none" }} key={lm.id}>
                                        <NavLink to={lm.path} ><li style={{ height: '25px', display: 'flex', alignItems: 'center', color: '#999999', textAlign: "center" }}><img src={`${API_URL}/${lm.massager.footerIcon}`} style={{ width: '20px', marginRight: '30px' }} alt={""}/>  {lm.massager.name}</li></NavLink>
                                        
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}



            </div>
            <div>
                <p style={{ color: '#999999', textAlign: "center" }}>Programmers | rozahakobyan176@gmail.com  petrosyanartur064@gmail.com</p>
            </div>
        </footer>
    );
}

export default Footer;