import React, { useEffect } from "react";
import translation from "../../assets/data/translation";
import { Account } from "../../helpers/Account";
import lambImage from '../../assets/images/lamb.png';
import oil from "../../assets/images/oil.png"
import transmission from "../../assets/images/transmission.png"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { carsListRequest } from "../../store/actions/cars";
import { API_URL } from "../../Api"
import { isFulfilled } from "@reduxjs/toolkit";

function TaxiCars() {
    const dispatch = useDispatch();

    const language = Account.getLanguage();

    const carsList = useSelector(state => state.cars.carsList)

    useEffect(() => {
        dispatch(carsListRequest())
    }, []);

    console.log(carsList)

    return (
        <div className="carsArea">
            <h3>{translation.selectACar[language]}</h3>
            <h5 style={{ textAlign: "center" }}>{translation.ourCars[language]}</h5>

            <div className="carsBlocks">
                {carsList && carsList.map(c => (
                    <div className="carBlock" key={c.id}>
                        <div className="carName">
                            <p><strong>{c.name}</strong></p>
                        </div>
                        <div className="carImg">
                        <img src={`${API_URL}/${c.image}`} alt={""} /> {/* img size 800x510  */}
                        </div>
                        <div className="carCharacteristics">
                            <table className="carCharacteristicsTable">
                                <tbody >
                                    <tr>
                                        <td>
                                            <img src={oil} />
                                            <p>{c.translation[language].fuel}</p>
                                        </td>
                                        <td>
                                            <img src={transmission} />
                                            <p>{c.translation[language].transmission}</p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            <div className="carPrice">
                                <p>{c.price}</p>
                            </div>

                            <div className="taxiButtonArea">
                                <NavLink to={`/taxi-car-detales/${c.id}`}>
                                    <div className="becomeADriver"><strong>{translation.bAD[language]}</strong></div>
                                </NavLink>
                            </div>

                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default TaxiCars