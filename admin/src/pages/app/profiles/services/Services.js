import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { servicesListRequest } from '../../../../store/actions/services';
import Service from "../../../../components/services/Service";

function Services() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.services.loading);
    const servicesList = useSelector(state => state.services.servicesList);

    useEffect(() => {
        dispatch(servicesListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'services childrenWidth'}>
            <Helmet>
                <title>all services</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : servicesList.map(item =>
                            <Service
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                service={item}/>)
                }
            </div>
        </div>
);
}

export default Services;

