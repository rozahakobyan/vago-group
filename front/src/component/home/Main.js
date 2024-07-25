import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bannerListRequest } from "../../store/actions/banner";
import {Account} from "../../helpers/Account";
import {API_URL} from "../../Api";
import loginImage from "../../assets/images/login.jpg";
import translation from "../../assets/data/translation";


function Main() {
    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)
    const language = Account.getLanguage();

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, []);
    
    return (
        <>
            {bannersList && bannersList.map(b => (
                <section key={b.id}>
                    <div className="banner-panel" style={{
                        backgroundImage: b?.homeImage ? `url(${API_URL}/${b.homeImage})` : `url(${loginImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                        <div className="shade">
                            <div className="motto">
                                <h1 className="motto-title">{b.translation[language].title}</h1>
                                <p className="motto-text">{b.translation[language].description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            ))
            }
            
            <section>
                <div className='services'>
                    <div className='service-title'>{translation.ourServices[language]}</div>
                    <div className='services-buttons'>
                        <div className='bigBlock'>
                            <p style={{textAlign: 'center'}}>{translation.construction[language]}</p>
                            <NavLink to={'/construction'}>
                                <div className='services-button'>
                                    <img src={bannersList && bannersList[0]?.constructionImage ? `${API_URL}/${bannersList[0].constructionImage}` : './img/construction.jpg'} alt={""}/>
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{textAlign: 'center'}}>{translation.employmentAgency[language]}</p>
                            <NavLink to={'/employment-agency'}>
                                <div className='services-button'>
                                    <img src={bannersList && bannersList[0]?.employmentAgencyImage ? `${API_URL}/${bannersList[0].employmentAgencyImage}` : './img/recruitment.jpg'} alt={""} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>{translation.logistics[language]}</p>
                            <NavLink to={'/logistic'}>
                                <div className='services-button'>
                                    <img src={bannersList && bannersList[0]?.logisticImage ? `${API_URL}/${bannersList[0].logisticImage}` : './img/logistic.jpg'} alt={""} />
                                </div>
                            </NavLink>
                        </div>

                        <div className='bigBlock'>
                            <p style={{ textAlign: 'center' }}>{translation.taxi[language]}</p>
                            <NavLink to={'/taxi'}>
                                <div className='services-button'>
                                    <img src={bannersList && bannersList[0]?.taxiImage ? `${API_URL}/${bannersList[0].taxiImage}` : './img/taxi.jpg'} alt={""} />
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