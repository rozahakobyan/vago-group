import React, { useEffect } from 'react';
import { bannerListRequest } from "../../store/actions/banner";
import { API_URL } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import loginImage from "../../assets/images/login.jpg";

function Taxi_banner() {

    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, []);

    return (
        <>
            {bannersList && bannersList.map(b => (
                <div key={b.id} className="bannerArea" style={{
                    width: "100%",
                    height: "300px",
                    backgroundImage: b?.taxiImage ? `url(${API_URL}/${b.taxiImage})` : `url(${loginImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div >
            ))}
        </>
    )
}

export default Taxi_banner