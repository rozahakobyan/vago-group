import React from "react";
import { ReactComponent as ArrowOpen } from "../assets/icon/arrowOpen.svg";



function Whatsapp() {
    return (
        <div>
            <div className="fixed-button-area">
                <button className="fixed-block-1"></button>
                <ArrowOpen className="fixed-block-1" />
            </div>
            <div className="fixed-button-area">
                <a href="https://wa.me/+37477571551"><div className="fixed-block"></div></a>
            </div>
        </div>
    )
}

export default Whatsapp;
