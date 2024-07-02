import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import {ourAdvantagesTaxiListRequest} from "../../../../store/actions/ourAdvantagesTaxi";
import OurAdvantageTaxi from "../../../../components/cars/OurAdvantageTaxi";

function OurAdvantagesTaxi() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.ourAdvantagesTaxi.loading);
    const ourAdvantagesList = useSelector(state => state.ourAdvantagesTaxi.ourAdvantagesTaxiList);

    useEffect(() => {
        dispatch(ourAdvantagesTaxiListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'our-advantages childrenWidth'}>
            <Helmet>
                <title>all our advantages taxi</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : ourAdvantagesList.map(item =>
                            <OurAdvantageTaxi
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                ourAdvantage={item}/>)
                }
            </div>
        </div>
    );
}

export default OurAdvantagesTaxi;

