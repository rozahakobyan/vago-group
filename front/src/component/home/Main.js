import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bannerListRequest } from "../../store/actions/banner";
import {Account} from "../../helpers/Account";
import {API_URL} from "../../Api";
import loginImage from "../../assets/images/login.jpg";

function Main() {
    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)
    const language = Account.getLanguage();

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, [bannersList, language]);

    console.log(bannersList)

    return (

        <>
            {bannersList && bannersList.map(b => (
                <section>
                    <div className="banner-panel" style={{
                        backgroundImage: b?.homeImage ? `url(${API_URL}/${b.homeImage})` : `url(${loginImage})`,
                        backgroundRepeat: "no-repeat",
                        height: "100vh"
                    }}>
                        <div className="shade">
                            <div className="motto">
                                <h1 className="motto-title">{b.translation[language].title}</h1>
                                <p className="motto-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima
                                    ut atque </p>
                            </div>
                        </div>
                    </div>
                </section>
            ))}


            <section>
                <div className='services'>
                    <div className='service-title'>OUR SERVICES</div>
                    <div className='services-buttons'>
                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>CONSTRUCTION</p>
                            <NavLink to={'/construction'}>
                                <div className='services-button'>
                                    <img src={'./img/construction.jpg'} alt={""} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>EMPLOYMENT-AGENCY</p>
                            <NavLink to={'/employment-agency'}>
                                <div className='services-button'>
                                    <img src={'./img/recruitment.jpg'} alt={""} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>CONSTRUCTION</p>
                            <NavLink to={'/logistic'}>
                                <div className='services-button'>
                                    <img src={'./img/logistic.jpg'} alt={""} />
                                </div>
                            </NavLink>
                        </div>

                    </div>

                </div>

            </section>
        </>
    );
}

export default Main;