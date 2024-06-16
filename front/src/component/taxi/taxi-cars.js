import React from "react";
import translation from "../../assets/data/translation";
import { Account } from "../../helpers/Account";
import lambImage from '../../assets/images/lamb.png';
import oil from "../../assets/images/oil.png"
import transmission from "../../assets/images/transmission.png"


function TaxiCars() {
    const language = Account.getLanguage();


    return (
        <div className="carsArea">
            <h3>{translation.selectACar[language]}</h3>
            <h5 style={{ textAlign: "center" }}>Большинство наших автомобилей от 2020 выпуска и новее. Забудьте о стареньких Skoda, Prius 2 и других.<br /> տեքստը ադմինկից կարանք փոխենք</h5>

            <div className="carsBlocks">
                <div className="carBlock">
                    <div className="canName">
                        <p><strong>Lamborgini Aventador 2023</strong></p>
                    </div>
                    <div className="carImg">
                        <img src={lambImage} alt={''} /> {/* img size 800x510  */}
                    </div>
                    <div className="carCharacteristics">
                        <table className="carCharacteristicsTable">
                            <tbody >
                                <tr>
                                    <td>
                                        <img src={oil} />
                                        <p>Gas/Gasoline/Hibrid</p>
                                    </td>
                                    <td>
                                        <img src={transmission} />
                                        <p>Automat</p>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div className="taxiButtonArea">
                            <div className="becomeADriver"><strong>BECOME A DRIVER</strong></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxiCars