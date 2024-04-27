import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { packagesListRequest } from '../../../../store/actions/packages';
import Package from "../../../../components/packages/Package";

function Packages() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.packages.loading);
    const packagesList = useSelector(state => state.packages.packagesList);

    useEffect(() => {
        dispatch(packagesListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'packages childrenWidth'}>
            <Helmet>
                <title>all packages</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : packagesList.map(item =>
                            <Package
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                packages={item}/>)
                }
            </div>
        </div>
);
}

export default Packages;

