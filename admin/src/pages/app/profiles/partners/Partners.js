import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { partnersListRequest } from '../../../../store/actions/partners';
import Partner from "../../../../components/partners/Partner";

function Partners() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.partners.loading);
    const partnersList = useSelector(state => state.partners.partnersList);

    useEffect(() => {
        dispatch(partnersListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'partners childrenWidth'}>
            <Helmet>
                <title>all partners</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : partnersList.map(item =>
                            <Partner
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                partner={item}/>)
                }
            </div>
        </div>
);
}

export default Partners;

