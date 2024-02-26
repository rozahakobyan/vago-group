import React from "react";
import { Link } from "react-router-dom";

function Partners() {
    return (
        <section>
            <div className="EmploymentAgency-partners-area">
                <div className="EmploymentAgency-partner-info">
                    <div className="EmploymentAgency-partners-title">
                        <h1>Partners</h1>
                    </div>
                    <div className="EmploymentAgency-partners-blocks">
                        <Link to={'#'}>
                            <div className="EmploymentAgency-block"><img src={"./img/logo.jpg"} /></div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Partners;

