import React from "react";
import { NavLink } from "react-router-dom";


function Vacancieces() {
    return (
        <div className="vacanciesArea">
            <div className="vacanciesTitle">
                <h2>Vacancies</h2>
            </div>
            <div className="vacancies-blocks">

                <div className="vacancie">
                    <div className="vacancie-img">
                        <img src="./img/vacancie.png" />
                    </div>
                    <div className="vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br />
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="vacancie-name">Work Schedule</h2>
                        <p>
                            ??:?? - ??:??<br />
                            ??:?? - ??:??
                        </p>

                        <NavLink to={'/vacancies-detales'}>
                            <button className="vacancie-join"><strong>More</strong></button>
                        </NavLink>
                    </div>
                </div>

                <div className="vacancie">
                    <div className="vacancie-img">
                        <img src="./img/vacancie.png" />
                    </div>
                    <div className="vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br />
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="vacancie-name">Work Schedule</h2>
                        <p>
                            ??:?? - ??:??<br />
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