import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import Logo from "./Logo";
import {scrollStatus} from "../../store/actions/users";
import Profile from "./Profile";
import {useDispatch} from "react-redux";

const Header = ({open, setOpen, path}) => {
    const dispatch = useDispatch();

    const [scrollDirection, setScrollDirection] = useState(null);
    const [settingModal, setSettingModal] = useState(null);

    useEffect(() => {
        dispatch(scrollStatus(scrollDirection))
    }, [scrollDirection])

    useEffect(() => {
        let prevScrollPos = window.pageYOffset + 105;
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            if (prevScrollPos < currentScrollPos) {
                setScrollDirection(true);
            }
            if (prevScrollPos > currentScrollPos) {
                setScrollDirection(false);
            }
            prevScrollPos = Math.floor(currentScrollPos);
            if (prevScrollPos < 95) {
                setScrollDirection(null)
            }
            setSettingModal(null)
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [scrollDirection]);

    return (
        <header className={classNames('header')}>
            <nav className={classNames('nav', {
                activeScroll: scrollDirection,
                isActiveScroll: scrollDirection === false
            })}>
                <Logo open={open} setOpen={setOpen}/>

                <h3>{path?.subMenuPath ? path.subMenuPath.toUpperCase().replaceAll("-", " ").replaceAll('"', "")
                    : path.navPath === "/users/1" ? "USERS" : path.navPath.toUpperCase().replaceAll("-", " ").replaceAll('"', "")}</h3>

                <Profile
                    setSettingModal={setSettingModal}
                    settingModal={settingModal}
                    scrollDirection={scrollDirection}
                />
            </nav>
        </header>
    );
};

export default Header;
