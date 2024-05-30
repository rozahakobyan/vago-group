import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Massager from "../../../../components/massagers/Massager";
import {massagerListRequest} from "../../../../store/actions/massagers";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";

function Massagers() {
    const dispatch = useDispatch();
    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.massagers.loading);
    const massagersList = useSelector(state => state.massagers.massagersList);

    useEffect(() => {
        dispatch(massagerListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'massagers childrenWidth'}>
            <Helmet>
                <title>all massagers</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : massagersList.map(item =>
                            <Massager
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                massager={item}/>)
                }
            </div>
        </div>
);
}

export default Massagers;

