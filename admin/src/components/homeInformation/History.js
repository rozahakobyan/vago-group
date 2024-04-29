import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { servicesDeleteRequest } from '../../store/actions/services';
import UpdateItemservice from './UpdateItemHistory';
import UpdateItemHistory from "./UpdateItemHistory";
import {historiesDeleteRequest} from "../../store/actions/histories";

function History({history, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(historiesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((history) => () => {
        setUpdateItem(history)
    }, []);

    return (
        <div className={`item${history.active ? " active" : ""}`}>
            <span>{history.description}</span>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(history)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(history.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemHistory
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default History;