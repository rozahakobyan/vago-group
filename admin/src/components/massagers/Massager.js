import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {massagerDeleteRequest} from "../../store/actions/massagers";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemMassager from "./UpdateItemMassager";

function Massager({massager, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(massagerDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((massager) => () => {
        setUpdateItem(massager)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${massager.icon}`} alt={massager.name}/>
            <h3>{massager.name}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(massager)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(massager.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemMassager
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Massager;