import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ArrowOpen } from "../assets/icon/arrowOpen.svg";



function Whatsapp() {
    return (
        <div>
            <div className="fixed-button-area">
                <button className="fixed-block-1"></button>
                <ArrowOpen className="fixed-block-1"/>
            </div>
            <div className="fixed-button-area">
                <NavLink to={'https://wa.me/+37477571551'}><div class="fixed-block"></div></NavLink>
            </div>
        </div>
    )
}


export default Whatsapp