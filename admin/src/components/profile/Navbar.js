import React, {useEffect, useState} from "react";
import classNames from "classnames";
import NavbarItem from "./NavbarItem";
import {MdConstruction, MdDashboard} from "react-icons/md";
import {FaFacebookMessenger, FaRegRegistered, FaUsers} from "react-icons/fa";
import {AiOutlineTeam} from "react-icons/ai";
import {IoIosHelpCircle, IoIosSettings} from "react-icons/io";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Account} from "../../helpers/account";
import {BiBuilding} from "react-icons/bi";

const navItem = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: MdDashboard,
        path: '/',
        renderItem: true
    },
    {
        id: 2,
        name: 'Information',
        Icon: FaRegRegistered,
        openIcon: true,
        renderItem: true,
        path: 'information',
        subMenu: [
            {
                id: 2_1,
                title: "Add New Login Image",
                path: "add-new-login-image",
            },
            {
                id: 2_2,
                title: "Login Image",
                path: "login-image",
            },
        ]
    },
    {
        id: 3,
        name: 'Massagers',
        Icon: FaFacebookMessenger,
        openIcon: true,
        renderItem: true,
        path: 'massagers',
        subMenu: [
            {
                id: 3_1,
                title: "Add New Massagers",
                path: "add-new-massagers",
            }
        ]
    },
    {
        id: 4,
        name: 'Works',
        path: 'works',
        Icon: BiBuilding,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 4_1,
                title: "Add New Works",
                path: "add-new-works",
            },
        ]
    },
    {
        id: 5,
        name: 'Products',
        path: 'products',
        Icon: MdConstruction,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 5_1,
                title: "Add New Products",
                path: "add-new-products",
            },
        ]
    },
    {
        id: 6,
        name: 'Partners',
        path: 'partners',
        Icon: AiOutlineTeam,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 6_1,
                title: "Add New Partners",
                path: "add-new-partners",
            },
        ]
    },
    {
        id: 8,
        name: 'Users',
        Icon: FaUsers,
        path: "/users/1",
        renderItem: true,
    },
    {
        id: 9,
        name: 'Settings',
        Icon: IoIosSettings,
        path: "settings",
        renderItem: true,
    },
    {
        id: 10,
        name: 'Help',
        Icon: IoIosHelpCircle,
        path: "help",
        renderItem: true,
    },
]
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
