import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import { ourAdvantagesDeleteRequest } from '../../store/actions/ourAdvantages';
import UpdateItemOurAdvantage from './UpdateItemOurAdvantage';
import {API_URL} from "../../Api";

function OurAdvantage({ourAdvantage, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(ourAdvantagesDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((ourAdvantage) => () => {
        setUpdateItem(ourAdvantage)
    }, []);

    return (
        <div className={'item'}>
            <img src={`${API_URL}/${ourAdvantage.image}`} alt={ourAdvantage.text}/>
            <ul className="icon_row">
                <li
                    onClick={handleUpdate(ourAdvantage)}
                    className={'icon'}>
                    <BiEdit/>
                </li>
                <li
                    onClick={handleDelete(ourAdvantage.id)}
                    className={'icon'}>
                    <RiDeleteBin6Line/>
                </li>
            </ul>
            <UpdateItemOurAdvantage
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default OurAdvantage;