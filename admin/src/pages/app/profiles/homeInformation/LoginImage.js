import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";

import {IoClose} from "react-icons/io5";
import {AiFillDelete} from "react-icons/ai";

import IsLoading from "../../../../components/LoadingPage";
import {loginImageAddRequest, loginImageListRequest} from "../../../../store/actions/loginImage";
import LogImage from "../../../../components/homeInformation/LogImage";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import Massager from "../../../../components/massagers/Massager";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: "#bebebe",
        borderRadius: "35px 10px 35px 10px",
    },
};

function LoginImage() {
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.loginImage.loading);
    const loginImagesList = useSelector(state => state.loginImage.loginImagesList);

    useEffect(() => {
        dispatch(loginImageListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    return (
        <div className={'login-image childrenWidth'}>
            <Helmet>
                <title>all login image</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : loginImagesList.map(item =>
                            <LogImage
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                loginImage={item}/>)
                }
            </div>
        </div>
);
}

export default LoginImage;

