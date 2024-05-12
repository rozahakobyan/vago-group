import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { servicesListRequest } from "../../store/actions/services";
import { Account } from "../../helpers/Account";
import translation from "../../assets/data/translation";



function Services() {
    const dispatch = useDispatch();

    const servicesList = useSelector(state => state.services.servicesList)
    const language = Account.getLanguage();


    useEffect(() => {
        dispatch(servicesListRequest())
    }, []);


    return (
        <div className="serviceList">
            <div className="service-area">
                <h2 className="serviceList-title">{translation.services[language]}</h2>
                <div className="serviceList-area">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>{translation.serviceName[language]}</th>
                                <th>{translation.price[language]}</th>

                            </tr>
                        </thead>
                        <tbody>
                           
                            {servicesList && servicesList.map(s => (

                                <tr key={s.id}>
                                    <td className="serviceName">{s.translation[language].name}</td>

                                    <td>{s.number}</td>
                                </tr>

                            ))}


                        </tbody>

                    </table>


                </div>
            </div>
        </div>
    )
}

export default Services