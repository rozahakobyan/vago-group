import React, {useCallback} from 'react';
import {useDispatch} from "react-redux";
import {BiEdit} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import UpdateItemOurAdvantage from './UpdateItemOurAdvantage';
import {API_URL} from "../../Api";
import {ourAdvantagesTaxiDeleteRequest} from "../../store/actions/ourAdvantagesTaxi";
import UpdateItemOurAdvantageTaxi from "./UpdateItemOurAdvantageTaxi";

function OurAdvantageTaxi({ourAdvantage, updateItem, setUpdateItem}) {
    const dispatch = useDispatch();

    const handleDelete = useCallback((id)=> () => {
        dispatch(ourAdvantagesTaxiDeleteRequest({id}))
    }, [])

    const handleUpdate = useCallback((ourAdvantage) => () => {
        setUpdateItem(ourAdvantage)
    }, []);

    return (
        <div className={`item${ourAdvantage.active ? " active" : ""}`}>
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
            <UpdateItemOurAdvantageTaxi
                updateItem={updateItem}
                setUpdateItem={setUpdateItem}/>
        </div>
    );
}

export default OurAdvantageTaxi;