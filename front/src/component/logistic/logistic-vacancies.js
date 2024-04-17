import React from "react";
import { NavLink } from "react-router-dom";

function Vacancieces(){
    return(
        <div className="logistic-vacanciesArea">
            <div className="logistic-vacanciesTitle">
                <h2>Vacancies</h2>
            </div>
            <div className="logistic-vacancies-blocks">

                <div className="logistic-vacancie">
                    <div className="logistic-vacancie-img">
                        <img src="./img/vacancie.png"/>
                    </div>
                    <div className="logistic-vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="logistic-vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br/>
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="logistic-vacancie-name">Work Schedule</h2>
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


export default Vacancieces