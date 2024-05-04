import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {bannerDeleteRequest} from "../../store/actions/banner";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemBanner from "./UpdateItemBanner";

function Banner ({banner, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id) => () => {
        dispatch(bannerDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((banner) => () => {
        setUpdateItem(banner)
    }, []);

    return (
        <div className={`item${banner.active ? " active" : ""}`}>
            <img src={`${API_URL}/${banner.homeImage}`} alt={""}/>
            <h3>{banner.title}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(banner)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(banner.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemBanner
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Banner;