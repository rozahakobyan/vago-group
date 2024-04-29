import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import { historiesListRequest } from '../../../../store/actions/histories';
import History from "../../../../components/homeInformation/History";

function Histories() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.histories.loading);
    const historiesList = useSelector(state => state.histories.historiesList);

    useEffect(() => {
        dispatch(historiesListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'histories childrenWidth'}>
            <Helmet>
                <title>all histories</title>
            </Helmet>
            
            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : historiesList.map(item =>
                            <History
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                history={item}/>)
                }
            </div>
        </div>
);
}

export default Histories;

