import React from "react";

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

                        <button className="logistic-vacancie-join"><strong>Join</strong></button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}


export default Vacancieces