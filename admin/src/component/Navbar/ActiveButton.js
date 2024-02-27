import React, {useCallback, useContext, useEffect} from 'react';
import {BsChevronLeft} from "react-icons/bs";
import classNames from "classnames";
import {NavbarCreateContext} from "./Navbar";
import {useDispatch, useSelector} from "react-redux";
import {activeNavbarToggle} from "../../store/actions/users";

const ActiveButton = () => {
    const activeNavbar = useSelector(state => state.users.activeNavbar)
    const dispatch = useDispatch()
    const { controllersNavStets, setControllersNavStets} = useContext(NavbarCreateContext);

    const handleShowNavbar = useCallback(() => {
        setControllersNavStets(true)
                setTimeout(()=>{
                    dispatch(activeNavbarToggle())
                },600)
    }, [])

    useEffect(()=>{
         if(controllersNavStets){
             setTimeout(()=>{
                 setControllersNavStets(false)
             },700)
         }
    },[controllersNavStets])

    return (
        <div onClick={handleShowNavbar} className={classNames('nav_close_button')}>
            <span className={classNames('btn_icon', {
                active_icon_btn: activeNavbar
            })}><BsChevronLeft/></span>
        </div>
    );
};

export default ActiveButton;
