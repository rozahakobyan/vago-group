import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import { pricesDeleteRequest } from '../../store/actions/prices';
import UpdateItemPrice from "./UpdateItemPrice";

function Price({price, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(pricesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((price) => () => {
        setUpdateItem(price)
    }, []);

    return (
        <div className={`item${price.active ? " active" : ""}`}>
            <h3>{price.name}</h3>
            <h3>Advanced - {price.advanced}</h3>
            <h3>Premium - {price.premium}</h3>
            <h3>Standard - {price.standard}</h3>
            <h3>Page - {price.activePage}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(price)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(price.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemPrice
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Price;