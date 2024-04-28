import React, { useEffect, useState } from "react";
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {pricesListRequest} from "../../store/actions/prices";
import {packagesListRequest} from "../../store/actions/packages";


function Prices() {
    const dispatch = useDispatch();

    const pricesList = useSelector(state => state.prices.pricesList);
    const packagesList = useSelector(state => state.packages.packagesList);

    useEffect(() => {
        dispatch(pricesListRequest({active: true, activePage: "Employment Agency"}))
        dispatch(packagesListRequest({activePage: "Employment Agency"}))
    }, []);

    return (
        <div className="priceList">
            <div className="priceList-area">
                <h2 className="priceList-title">Packages List</h2>
                <div className="priceList-area">
                    <table className="Prices-table">
                        <thead>
                            <tr>
                                <th>Packages</th>
                                <th>Advanced</th>
                                <th>Premium</th>
                                <th>Standard</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricesList && pricesList.map(p => ( <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.advanced}</td>
                                <td>{p.premium}</td>
                                <td>{p.standard}</td>
                            </tr>))}

                            {packagesList && packagesList.map(p => ( <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.advanced ? "🗸" : ""}</td>
                                <td>{p.premium ? "🗸" : ""}</td>
                                <td>{p.standard ? "🗸" : ""}</td>
                            </tr>))}

                            <tr className="order-button">
                                <td className="service-name"></td>
                                <td><button>ORDER</button></td>
                                <td><button>ORDER</button></td>
                                <td><button>ORDER</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Prices