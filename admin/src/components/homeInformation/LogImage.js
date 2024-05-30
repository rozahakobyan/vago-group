import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";
import IsLoading from "../LoadingPage";
import {loginImageDeleteRequest, loginImageUpdateRequest} from "../../store/actions/loginImage";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {IoClose} from "react-icons/io5";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemMassager from "../massagers/UpdateItemMassager";
import UpdateItemLoginImage from "./UpdateItemLoginImage";

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

const { REACT_APP_API_URL } = process.env;

function LogImage({loginImage, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const [updateLoginImage, setUpdateLoginImage] = useState({
        image: {}
    })
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});

    const loading = useSelector(state => state.loginImage.loading);

    const handleFileSelect = useCallback((ev) => {
        [...ev.target.files].forEach((file) => {
            setUpdateLoginImage({image: file});
            const createUrl = URL.createObjectURL(file);
            setFile(createUrl);
        });

        ev.target.value = '';
    }, [updateLoginImage]);

    const handleDeleteImage = useCallback(() => {
        setUpdateLoginImage({image: {}})
        setFile("")
    }, [updateLoginImage])

    const submit = useCallback(async (ev) => {
        ev.preventDefault();
        try{
            const {payload} = await dispatch(loginImageUpdateRequest({id: loginImage.id, updateLoginImage}));
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
    }, [updateLoginImage])

    const handleDelete = useCallback((id) => () => {
        dispatch(loginImageDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((loginImage) => () => {
        setUpdateItem(loginImage)
    }, []);

    return (
        <div className={`item${loginImage.active ? " active" : ""}`}>
            <img src={`${API_URL}/${loginImage.image}`} alt={""}/>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(loginImage)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(loginImage.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemLoginImage
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default LogImage;