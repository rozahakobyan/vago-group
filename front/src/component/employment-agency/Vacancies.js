import React from "react";
import { NavLink } from "react-router-dom";

function Vacancies(){
    return(
        <div className="employmentAgency-vacanciesArea">
            <div className="employmentAgency-vacanciesTitle">
                <h2>Vacancies</h2>
            </div>
            <div className="employmentAgency-vacancies-blocks">
                <div className="employmentAgency-vacancie">
                    <div className="employmentAgency-vacancie-img">
                        <img src="./img/vacancie.png"/>
                    </div>
                    <div className="employmentAgency-vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="employmentAgency-vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br/>
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="employmentAgency-vacancie-name">Work Schedule</h2>
                        <p>
                            ??:?? - ??:??<br/>
                            ??:?? - ??:??
                        </p>

                        <NavLink to={'/vacancies-detales'}>
                            <button className="vacancie-join"><strong>More</strong></button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vacancies
