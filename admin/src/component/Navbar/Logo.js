import React, {useContext, useEffect, useState} from 'react';
import classNames from "classnames";
import logoImg from '../../assets/icon/navbarLogo.png'
import tourImg from '../../assets/icon/tourLogo.png'
import {useSelector} from "react-redux";

const Logo = () => {
    const [activeLogo, setActiveLogo] = useState(false)
    const activeNavbar = useSelector(state => state.users.activeNavbar)
    useEffect(() => {
        if (activeNavbar) {
            setTimeout(() => {
                setActiveLogo(true)
            }, 300)
        } else {
            setActiveLogo(false)
        }
    }, [activeNavbar])

    return (
        <div className={'logo_navbar_block'}>
            <div className={classNames('logos', {
                active_logo: activeLogo
            })}>
                <img className={'logo_nav_tour_active'} src={logoImg}/>
                <img className={'logo_nav_active'} src={tourImg}/>
            </div>
        </div>
    );
};

export default Logo;
