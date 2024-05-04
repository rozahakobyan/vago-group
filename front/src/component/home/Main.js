import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bannerListRequest } from "../../store/actions/banner";


function Main() {
    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, []);

    console.log(bannersList)

    return (

        <>
            {bannersList && bannersList.map(b => (
                <section>
                    <div className="banner-panel" style={{
                        

                    }}>
                        <div className="shade">
                            <div className="motto">
                                <h1 className="motto-title"> Lorem</h1>
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