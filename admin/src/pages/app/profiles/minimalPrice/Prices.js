import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { pricesListRequest } from '../../../../store/actions/prices';
import Price from "../../../../components/prices/Price";
import {minimalPrices} from "../../../../store/reducers/minimalPrices";
import {minimalPricesListRequest} from "../../../../store/actions/minimalPrices";

function Prices() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.minimalPrices.loading);
    const pricesList = useSelector(state => state.minimalPrices.pricesList);

    useEffect(() => {
        dispatch(minimalPricesListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'prices childrenWidth'}>
            <Helmet>
                <title>all prices</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : pricesList.map(item =>
                            <Price
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                price={item}/>)
                }
            </div>
        </div>
);
}

export default Prices;

