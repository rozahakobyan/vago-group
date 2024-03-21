import React from 'react';
import { NavLink } from 'react-router-dom';


function Main() {
    return (
        <>
            <section>
                <div className="banner-panel">
                    <div className="shade">
                        <div className="motto">
                            <h1 className="motto-title"> Lorem</h1>
                            <p className="motto-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis minima
                                ut atque </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='services'>
                <div className='service-title'>OUR SERVICES</div>
                    <div className='services-buttons'>
                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>CONSTRUCTION</p>
                            <NavLink to={'/construction'}>
                                <div className='services-button'>
                                    <img src={'./img/construction.jpg'} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>EMPLOYMENT-AGENCY</p>
                            <NavLink to={'/employment-agency'}>
                                <div className='services-button'>
                                    <img src={'./img/recruitment.jpg'} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>CONSTRUCTION</p>
                            <NavLink to={'/logistic'}>
                                <div className='services-button'>
                                    <img src={'./img/logistic.jpg'} />
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