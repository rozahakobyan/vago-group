import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { servicesDeleteRequest } from '../../store/actions/services';
import UpdateItemservice from './UpdateItemService';
import UpdateItemService from "./UpdateItemService";

function Service({service, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(servicesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((service) => () => {
        setUpdateItem(service)
    }, []);

    return (
        <div className={'item'}>
            <h3>Name - {service.translation.en.name}</h3>
            <h3>Price - {service.number}</h3>
            <h3>Page - {service.activePage}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(service)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(service.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemService
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Service;