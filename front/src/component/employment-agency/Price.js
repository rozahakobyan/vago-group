import React, { useEffect, useState } from "react";
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {pricesListRequest} from "../../store/actions/prices";


function Prices() {
    const dispatch = useDispatch();

    const pricesList = useSelector(state => state.prices.pricesList);

    useEffect(() => {
        dispatch(pricesListRequest({active: true}))
    }, []);

    console.log(pricesList)

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
                            {pricesList.map(p => ( <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{typeof p.advanced === "string" ? p.advanced : p.advanced ? "🗸" : ""}</td>
                                <td>{typeof p.premium === "string" ? p.premium : p.premium ? "🗸" : ""}</td>
                                <td>{typeof p.standard === "string" ? p.standard : p.standard ? "🗸" : ""}</td>
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