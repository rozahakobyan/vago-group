import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from "react-redux";
import { servicesListRequest } from "../../store/actions/services";

function Services() {
    const dispatch = useDispatch();

    const servicesList = useSelector(state => state.services.servicesList)

    useEffect(() => {
        dispatch(servicesListRequest())
    }, []);

    console.log(servicesList)

    return (
        <div className="serviceList">
            <div className="service-area">
                <h2 className="serviceList-title">Services</h2>
                <div className="serviceList-area">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th >Service Name</th>
                                <th>Packages</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* product.map(p => (
                        <tr key={p.id}>
                            <td>{p.first_name}</td>
                            <td>{p.last_name}</td>
                            <td><img src={p.avatar} alt={""} width={50} height={50} /></td>
                        </tr>
                    )) */}
                            {servicesList && servicesList.map(s => (

                                <tr key={s.id}>
                                    <td className="serviceName">{s.name}</td>

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