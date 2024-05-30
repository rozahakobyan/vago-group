import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import {bannerListRequest} from "../../../../store/actions/banner";
import Banner from "../../../../components/homeInformation/Banner";

function Banners() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.banner.loading);
    const bannersList = useSelector(state => state.banner.bannersList);

    useEffect(() => {
        dispatch(bannerListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'banners childrenWidth'}>
            <Helmet>
                <title>all banners</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : bannersList.map(item =>
                            <Banner
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                banner={item}/>)
                }
            </div>
        </div>
    );
}

export default Banners;

