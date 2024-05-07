import React, { useEffect } from 'react';
import { bannerListRequest } from "../../store/actions/banner";
import { API_URL } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import loginImage from "../../assets/images/login.jpg";

function Banner() {

    const dispatch = useDispatch()

    const bannersList = useSelector(state => state.banner.bannersList)

    useEffect(() => {
        dispatch(bannerListRequest({ active: true }))
    }, [bannersList]);

    console.log(bannersList);

    return (
        <>
            {bannersList && bannersList.map(b => (
                <div className="bannerArea" style={{
                    width: "100%",
                    height: "300px",
                    backgroundImage: b?.homeImage ? `url(${API_URL}/${b.constructionImage})` : `url(${loginImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}></div >
            ))}
        </>
    )
}

export default Banner