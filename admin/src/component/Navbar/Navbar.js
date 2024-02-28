import React, {createContext, useState} from 'react';
import ActiveButton from "./ActiveButton";
import classNames from "classnames";
import Logo from "./Logo";
import NavbarItems from "./NavbarItems";
import {useSelector} from "react-redux";
import { ReactComponent as SettingsIcon } from "../../assets/icon/settings2.svg";
import navbarData from "../../assets/data/navbarData";

export const NavbarCreateContext = createContext(null)

const { REACT_APP_API_URL } = process.env;

const Navbar = () => {
    const [controllersNavStets, setControllersNavStets] = useState(false)
    const [activeIndex, setActiveIndex] = useState(1)
    const activeNavbar = useSelector(state => state.users.activeNavbar)
    const profile = useSelector(state => state.users.profile);

    return (
        <NavbarCreateContext.Provider value={{
            controllersNavStets,
            setControllersNavStets,
            setActiveIndex,
            activeIndex
        }}>
            <nav className={classNames('left_navbar', {
                activeNavbar
            })}>
                <ActiveButton/>
                <Logo/>
                <div className={'nav_container'}>
                    <ul className={'nav'}>
                        {
                            navbarData.map((item,index) => <NavbarItems item={item} index={index} key={index.toString()}/>)
                        }
                        <li className={'nav_item'}>
                            <div className={'nav_items_sub'}>
                                <img className={'user_photo'} src={`${REACT_APP_API_URL}/${profile.photo}`}/>
                                <p className={'user_name'}>{profile.firstName} {profile.lastName}</p>
                                <span className={'icon_nav_left'}><SettingsIcon/></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </NavbarCreateContext.Provider>
    );
};

export default Navbar;
