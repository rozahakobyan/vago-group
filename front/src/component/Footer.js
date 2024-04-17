import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { massagerListRequest } from "../store/actions/massagers";

function Footer() {
    const dispatch = useDispatch();

    const massagersList = useSelector(state => state.massagers.massagersList);

    useEffect(() => {
        dispatch(massagerListRequest())
    }, [])

    return (
        <footer>
            <div className='footer'>
                <div className="footer-info">
                    <div className="footer-address">
                        <div className="address-title">Address</div>
                        <div className="address-text">
                            <p>795 Folsom Ave, Suite 600
                                San Francisco, CA 94107
                                P : (123) 456-7890</p>
                        </div>
                    </div>

                    <div className="footer-phone">
                        <div className="footer-phone-title">Phone</div>
                        <div className="footer-phone-text">
                            <ul style={{ listStyle: "none" }}>
                                <li>Phone : +1234567890</li>
                                <li>Phone : +1234567890</li>
                                <li>Phone : +1234567890</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-email">
                        <div className="footer-email-title">Email</div>
                        <div className="footer-email-text">
                            <ul style={{ listStyle: "none" }}>
                                <li>Email : inchvorban@mail.ru</li>
                                <li>Email : inchvorban@mail.ru</li>
                                <li>Email : inchvorban@mail.ru</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-phone">
                        <div className="footer-phone-title">Massager</div>
                        <div className="footer-phone-text">
                            <ul style={{ listStyle: "none" }}>
                                <li style={{ height: '25px', display: 'flex', alignItems: 'center' }}><img src={'./img/icon/fb.png'} style={{ width: '20px', marginRight: '30px' }} />  Facebook</li>
                                <li style={{ height: '25px', display: 'flex', alignItems: 'center' }}><img src={'./img/icon/ins.png'} style={{ width: '20px', marginRight: '30px' }} />  Instagram</li>
                                <li style={{ height: '25px', display: 'flex', alignItems: 'center' }}><img src={'./img/icon/tg.png'} style={{ width: '20px', marginRight: '30px' }} />  Telegram</li>
                                <li style={{ height: '25px', display: 'flex', alignItems: 'center' }}><img src={'./img/icon/wp.png'} style={{ width: '20px', marginRight: '30px' }} />  Whatsapp</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <p style={{ color: '#999999', textAlign: "center" }}>Programmers | rhakobyan751@gmail.com  petrosyanartur064@gmail.com  mariampogosyan34@gmail.com</p>
            </div>
        </footer>
    );
}

export default Footer;