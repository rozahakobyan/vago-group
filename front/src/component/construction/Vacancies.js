import React from "react";

function Vacancieces(){
    return(
        <div className="vacanciesArea">
            <div className="vacanciesTitle">
                <h2>Vacancies</h2>
            </div>
            <div className="vacancies-blocks">

                <div className="vacancie">
                    <div className="vacancie-img">
                        <img src="./img/vacancie.png"/>
                    </div>
                    <div className="vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br/>
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="vacancie-name">Work Schedule</h2>
                        <p>
                            ??:?? - ??:??<br/>
                            ??:?? - ??:??
                        </p>

                        <button className="vacancie-join"><strong>Join</strong></button>
                    </div>
                </div>

                <div className="vacancie">
                    <div className="vacancie-img">
                        <img src="./img/vacancie.png"/>
                    </div>
                    <div className="vacancie-name">
                        <h2>Vacancie</h2>
                    </div>
                    <div className="vacancieText-area">
                        <p>
                            <strong>Price</strong> - ???$ <br/>
                            <strong>Hours a Week</strong> - ??h
                        </p>
                        <h2 className="vacancie-name">Work Schedule</h2>
                        <p>
                            ??:?? - ??:??<br/>
                            ??:?? - ??:??
                        </p>

                        <button className="vacancie-join"><strong>Join</strong></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Vacancieces