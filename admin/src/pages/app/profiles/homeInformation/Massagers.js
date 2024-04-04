import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";
import {IoClose} from "react-icons/io5";
import {AiFillDelete} from "react-icons/ai";
import IsLoading from "../../../../components/LoadingPage";
import Massager from "../../../../components/homeInformation/Massager";
import {massagerAddRequest, massagerListRequest} from "../../../../store/actions/massagers";
import {Helmet} from "react-helmet";
import LoadingPage from "../../../../components/LoadingPage";
import Info from "../../../../components/homeInformation/Info";

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

function Massagers() {
    const dispatch = useDispatch();

    const [massager, setMassager] = useState({
        name: "",
        icon: {},
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [errors, setErrors] = useState({});
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

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setMassager({...massager, icon: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [massager]);

    const handleDeleteImage = useCallback(() => {
        setMassager({...massager, icon: {}})
        setFile("")
    }, [massager])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(massagerAddRequest(massager));
            if(payload.status === "ok"){
                setMassager({
                    name: "",
                    image: {},
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
    }, [massager])

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

