import React, { useEffect, useState } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";
import {servicesListRequest} from "../../store/actions/services";

function Services() {
    const dispatch = useDispatch();

    const servicesList = useSelector(state => state.services.servicesList)

    useEffect(() => {
        dispatch(servicesListRequest())
    }, []);

    console.log(servicesList)

    return (
        <div className="priceList">
        <div className="priceList-area">
            <h2 className="priceList-title">Services</h2>
            <div className="priceList-area">
                <table className="Prices-table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
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
                        <tr>
                            <td className="service-name">esim inch</td>
                            
                            <td>650 EUR</td>
                        </tr>
                        
                    </tbody>

                </table>


            </div>
        </div>
    </div>
    )
}

export default Services