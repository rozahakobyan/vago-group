import React from "react";
import { Link } from "react-router-dom";

function Partners() {
    return (
        <section>
            <div className="partners-area">
                <div className="partner-info">
                    <div className="partners-title">
                        <h1>Partners</h1>
                    </div>
                    <div className="partners-blocks">
                        <Link to={'#'}>
                            <div className="block"><img src={"./img/logo.jpg"} /></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Partners;

