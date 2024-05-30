import React from "react";
import { ReactComponent as ArrowOpen } from "../assets/icon/arrowOpen.svg";
import ScrollToTop from "react-scroll-up";

function Whatsapp() {
    return (
        <div>
            <div className="fixed-button-area">
                <ScrollToTop showUnder={160}>
                    <ArrowOpen className="fixed-block-1" />
                </ScrollToTop>
            </div>
            <div className="fixed-button-area">
                <a href="https://wa.me/+37477571551"><div className="fixed-block"></div></a>
            </div>
        </div>
    )
}

export default Whatsapp;
