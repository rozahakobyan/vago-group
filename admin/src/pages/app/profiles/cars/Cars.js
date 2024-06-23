import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Car from "../../../../components/cars/Car";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { carsListRequest } from '../../../../store/actions/cars';

function Cars() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.cars.loading);
    const carsList = useSelector(state => state.cars.carsList);

    useEffect(() => {
        dispatch(carsListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'cars childrenWidth'}>
            <Helmet>
                <title>all cars</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : carsList.map(item =>
                            <Car
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                car={item}/>)
                }
            </div>
        </div>
    );
}

export default Cars;

