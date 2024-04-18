import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {API_URL} from "../../Api";
import {RiDeleteBin6Line} from "react-icons/ri";
import { partnersDeleteRequest } from '../../store/actions/partners';
import UpdateItemPartner from './UpdateItemPartner';

function Partner({partner, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(partnersDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((partner) => () => {
        setUpdateItem(partner)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${partner.image}`} alt={partner.name}/>
            <h3>partner - {partner.name}</h3>
            <h3>Price - {partner.price}</h3>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(partner)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(partner.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemPartner
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default Partner;