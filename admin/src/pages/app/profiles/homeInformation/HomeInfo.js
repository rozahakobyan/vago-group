import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addHomeInfoRequest, homeInfoListRequest} from "../../../../store/actions/homeInfo";
import Info from "../../../../components/homeInformation/Info";
import {createPortal} from "react-dom";
import Modal from "react-modal";
import IsLoading from "../../../../components/LoadingPage";
import {IoClose} from "react-icons/io5";
import {AiFillDelete} from "react-icons/ai";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";

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

function HomeInfo() {
    const dispatch = useDispatch();

    const [info, setInfo] = useState({
        title: "",
        video: {},
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [errors, setErrors] = useState({});
    const [updateItem, setUpdateItem] = useState(null);

    const loading = useSelector(state => state.homeInfo.loading);
    const infoList = useSelector(state => state.homeInfo.infoList);

    useEffect(() => {
        dispatch(homeInfoListRequest())
    }, []);

    useEffect(() => {
        if (updateItem?.isActive) {
            setTimeout(() => {
                setUpdateItem(null)
            }, 650)
        }
    }, [updateItem]);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setInfo({...info, video: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [info]);

    const handleDeleteImage = useCallback(() => {
        setInfo({...info, video: {}})
        setFile("")
    }, [info])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(addHomeInfoRequest(info));
            if(payload.status === "ok"){
                setInfo({
                    title: "",
                    video: {},
                })
                setErrors({})
                setFile("")
                setIsAdd(false)
            }
            if(payload.errors){
                setErrors(payload.errors)
            }
        }catch (e) {
            console.log(e)
        }
    }, [info])

    return (
        <div className={'info childrenWidth'}>
            <Helmet>
                <title>all info</title>
            </Helmet>

            <div className={'cont_cat'}>
                {
                    loading ? <LoadingPage/>
                        : infoList.map(item =>
                            <Info
                                updateItem={updateItem}
                                setUpdateItem={setUpdateItem}
                                key={item.id}
                                info={item}/>)
                }
            </div>
        </div>
    );
}

export default HomeInfo;