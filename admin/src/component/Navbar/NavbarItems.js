import React, {useCallback, useContext, useEffect, useState} from 'react';
import classNames from "classnames";
import {GoChevronDown} from "react-icons/go";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4,} from 'uuid';
import {NavbarCreateContext} from "./Navbar";
import {activeNavbarToggle, createUserData} from "../../store/actions/users";
import Account from "../../helpers/Account";
import {NavLink, useNavigate} from "react-router-dom";


const NavbarItems = ({item}) => {
    const [active, setActive] = useState(false);
    const [activeBorder, setActiveBorder] = useState(false);
    const activeNavbar = useSelector(state => state.users.activeNavbar)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const {controllersNavStets} = useContext(NavbarCreateContext)

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setActiveBorder(true)
            }, 530)
        } else {
            setActiveBorder(false)
        }
        if (controllersNavStets) {
            setActive(false)
        }
    }, [active, activeNavbar, controllersNavStets]);

    const handleItem = useCallback((evn,item) => {
        if (activeNavbar) {
            dispatch(activeNavbarToggle())
            setTimeout(() => {
                setActive(true)
            }, 600)
        } else {
            setActive(!active)
        }
        if(!item.subMenu) {
            navigation(item.path);
        }
        if (item.title === "logout") {
            Account.deleteStrong()
            dispatch(createUserData())
            navigation('/')
        }
    }, [active, activeNavbar]);


    return (
        <li className={classNames('nav_item', {
            active_nav_item: active
        })} onClick={(evn) => handleItem(evn,item)}>
            <div className={'nav_items_sub'}>
                <span>{<item.Icon fill={active ? '#red' :'#fff'}/>}</span>
                <p className={'text_navbar'}>{item.name}</p>
                {item.openIcon ? <span className={'icon_nav_left'}><GoChevronDown/></span> : null}
            </div>
            {item.subMenu &&
                <ul className={'sub_menu'}>
                    {
                        item.subMenu.map((sub) => (
                            sub.name ?
                                <li key={sub.id.toString() + uuidv4()} className={'sub_li'}>
                                    <NavLink to={sub.path} className={'sub_item_row'}>
                                        {sub.Icon ? <sub.Icon/> : null}
                                        <p className={'text_sub'}>{sub.name}</p>
                                    </NavLink>
                                </li>
                                : <li key={sub.id} className={'sub_item'}>
                                    <NavLink to={sub.path}>
                                        <p className={'title_sub'}>{sub.title}</p>
                                        {sub.title && <div className={classNames('anim_border', {
                                            active_line_border: activeBorder
                                        })}/>}
                                    </NavLink>
                                </li>
                        ))}
                </ul>
            }
        </li>
    )
};

export default NavbarItems;
