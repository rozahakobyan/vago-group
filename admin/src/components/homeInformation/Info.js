import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteHomeInfoRequest, updateHomeInfoRequest} from "../../store/actions/homeInfo";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemInfo from "./UpdateItemInfo";

function Info ({info, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [updateInfo, setUpdateInfo] = useState({
        title: info.title,
        video: {}
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const loading = useSelector(state => state.homeInfo.loading);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setUpdateInfo({...updateInfo, video: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [updateInfo]);

    const handleDeleteImage = useCallback(() => {
        setUpdateInfo({...updateInfo, video: {}})
        setFile("")
    }, [updateInfo])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(updateHomeInfoRequest({id: info.id, updateInfo}));
            if(payload.status === "ok"){
                setErrors({})
                setFile("")
                setIsEdit(false)
            }
            if(payload.errors){
                setErrors(payload.errors)
            }
        }catch (e) {
            console.log(e)
        }
    }, [updateInfo])

    const handleDelete = useCallback((id) => () => {
        dispatch(deleteHomeInfoRequest({id}))
    }, [])

    const handleUpdate = useCallback((info) => () => {
        setUpdateItem(info)
    }, []);

    return (
        <div className={'item'}>
            <video src={`${API_URL}/${info.video}`}/>
            <h3>{ info.title}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(info)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(info.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemInfo
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Info;