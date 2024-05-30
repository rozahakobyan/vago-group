import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createPortal} from "react-dom";
import Modal from "react-modal";
import IsLoading from "../LoadingPage";
import {galleriesDeleteRequest, galleriesUpdateRequest} from "../../store/actions/galleries";
import {BiEdit} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import {IoClose} from "react-icons/io5";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemMassager from "../massagers/UpdateItemMassager";
import UpdateItemGallery from "./UpdateItemGallery";

function Gallery({gallery, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id) => () => {
        dispatch(galleriesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((gallery) => () => {
        setUpdateItem(gallery)
    }, []);

    return (
        <div className={"item"}>
            <img src={`${API_URL}/${gallery.src}`} alt={""}/>
            <h3>{gallery.pageGallery}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(gallery)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(gallery.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemGallery
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Gallery;