import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { pricesListRequest } from "../../store/actions/prices";
import { packagesListRequest } from "../../store/actions/packages";
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";

function Prices() {
    const dispatch = useDispatch();

    const pricesList = useSelector(state => state.prices.pricesList);
    const packagesList = useSelector(state => state.packages.packagesList);
    const language = Account.getLanguage();


    useEffect(() => {
        dispatch(pricesListRequest({ active: true, activePage: "Logistic" }))
        dispatch(packagesListRequest({ activePage: "Logistic" }))
    }, []);
    return (
        <div className="priceList">
            <div className="priceList-area">
                <h2 className="priceList-title">{translation.packagesList[language]}</h2>
                <div className="priceList-area">
                    <table className="Prices-table">
                        <thead>
                            <tr>
                                <th>{translation.packages[language]}</th>
                                <th>{translation.standard[language]}</th>
                                <th>{translation.advanced[language]}</th>
                                <th>{translation.premium[language]}</th>

                            </tr>
                        </thead>
                        <tbody>
                            {pricesList && pricesList.map(p => (<tr key={p.id}>
                                <td>{p.translation[language].name}</td>
                                <td>{p.standard}</td>
                                <td>{p.advanced}</td>
                                <td>{p.premium}</td>

                            </tr>))}

                            {packagesList && packagesList.map(p => (<tr key={p.id}>
                                <td>{p.translation[language].name}</td>
                                <td>{p.advanced ? "🗸" : ""}</td>
                                <td>{p.premium ? "🗸" : ""}</td>
                                <td>{p.standard ? "🗸" : ""}</td>
                            </tr>))}

                            <tr className="order-button">
                                <td className="service-name"></td>
                                <td><button>{translation.order[language]}</button></td>
                                <td><button>{translation.order[language]}</button></td>
                                <td><button>{translation.order[language]}</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Prices