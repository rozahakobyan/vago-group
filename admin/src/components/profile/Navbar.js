import React, {useEffect, useState} from "react";
import classNames from "classnames";
import NavbarItem from "./NavbarItem";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Account} from "../../helpers/account";
import navItem from "../../assets/data/navItem";

const Navbar = () => {
    const [activePathName, setActivePathName] = useState('');
    const [activeSubItem, setActiveSubItem] = useState('')
    const scrollStatus = useSelector(state => state.users.scrollStatus);
    const {pathname} = useLocation();
    const {navPath, subMenuPath} = Account.getNavbarUrlPath();


    useEffect(() => {

        if (pathname === '/') {
            return setActivePathName('/')
        }

        if (subMenuPath) {
            setActiveSubItem(subMenuPath)
        } else {
            setActiveSubItem('')
        }
        if (navPath) {
            setActivePathName(navPath)
        }
    }, [navPath, subMenuPath]);

    return (
        <nav className={classNames('navbar-left', {
            activeScrollNavbar: scrollStatus,
            isActiveScrollNavbar: scrollStatus === false
        })}>
            <ul
                style={{
                    height: scrollStatus === null
                        ? "90%" : scrollStatus ? "100%" : "90%"
                }}
                className="nav-container">
                {
                    navItem.map((item) => (
                        <NavbarItem
                            setActivePathName={setActivePathName}
                            activePathName={activePathName}
                            item={item}
                            activeSubItem={activeSubItem}
                            setActiveSubItem={setActiveSubItem}
                            key={item.id}
                        />
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navbar;
